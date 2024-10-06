'use client';

import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { Input } from './components/Input';
import { getImages } from '@/server/actions/images';
import useLocalStorage from './hooks/localStorage';

const ScreenshotComponent = () => {
  const {save, load} = useLocalStorage();
  const sectionRef = useRef(null);
  const [allowScreenshot, setAllowScreenshot] = useState(false);
  const [padding, setPadding] = useState(Number(load('padding') ?? 120));
  const [opacity, setOpacity] = useState(Number(load('opacity') ?? 1));
  const [margin, setMargin] = useState(Number(load('margin') ?? 0));
  const [color1, setColor1] = useState(load('color1') ?? '#ccc');
  const [color2, setColor2] = useState(load('color2') ?? '#aaa');
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<number | null>(null)
  const [aspectRatio, setAspectRatio] = useState(Number(load('aspectRatio') ?? 1))

  useEffect(() => {
    save('padding', padding.toString());
    save('opacity', opacity.toString());
    save('margin', margin.toString());
    save('aspectRatio', aspectRatio.toString());
    save('color1', color1);
    save('color1', color1);
  }, [aspectRatio, color1, margin, opacity, padding, save]);

  useEffect(() => {
    const fetchData = async () => {
      const imagesLocal = await getImages();
      setImages(imagesLocal);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (images.length === 0) {
      return;
    }

    if (currentImage === null) {
      setCurrentImage(0);
      return;
    }

    if (!allowScreenshot) {
      return;
    }

    if (currentImage >= images.length) {
      setCurrentImage(null);
      setAllowScreenshot(false);
    }

    
  }, [allowScreenshot, currentImage, images]);

  useEffect(() => {
    console.log('useEffect 2', allowScreenshot, currentImage);
    if (allowScreenshot && currentImage !== null) {
      takeScreenshot();
      setTimeout(() => {
        setCurrentImage(currentImage + 1);
      }, 1000);
    }

  }, [allowScreenshot, currentImage])

  

  const takeScreenshot = () => {
    if (sectionRef.current) {
      html2canvas(sectionRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'screenshot.png';
        link.click();
      });
    }
  };

  return (
    <div style={{padding: 70}}>
      <div
        style={{
          marginBlockEnd: 50,
        }}
      >
        <Input label={`images ${images.length}`} type="number" value={currentImage ?? ''} onChange={(e) => setCurrentImage(Number(e.target.value))} />
        <Input label='padding' type="number" value={padding} onChange={(e) => setPadding(Number(e.target.value))} />
        <Input label='margin' type="number" value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
        <Input label='color1' type="string" value={color1} onChange={(e) => setColor1(e.target.value)} />
        <Input label='color2' type="string" value={color2} onChange={(e) => setColor2(e.target.value)} />
        <Input label='opacity' type="number" value={opacity} min={0} max={1} step={0.05} onChange={(e) => setOpacity(Number(e.target.value))} />
        
        <button 
          style={{
            padding: 12
          }}
          onClick={() => setAspectRatio(9 / 16)}>
            Aspect Ratio: 9 / 16
        </button>
        <button 
          style={{
            padding: 12
          }}
          onClick={() => setAspectRatio(1)}>
            Aspect Ratio: 1
        </button>
        <button 
          style={{
            padding: 12
          }}
          onClick={() => setAspectRatio(16 / 9)}>
            Aspect Ratio: 16 / 9
        </button>
        <button 
          style={{
            margin: 12,
            padding: 12,
            background: 'red',
            width: '100%'
          }}
          onClick={() => setAllowScreenshot(!allowScreenshot)}>
            {allowScreenshot ? 'Stop' : 'Start'}
        </button>
      </div>
      <div ref={sectionRef} style={
        { 
          padding: padding,
          background: `linear-gradient(${Math.round(Math.random() * 180)}deg, ${color1}, ${color2})`,
          aspectRatio,
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          {currentImage !== null ? <Image src={`/${images[currentImage]}`} alt="1" width={100} height={100} 
          style={{
            height: aspectRatio >= 1 ? '100%' : 'auto',
            width: aspectRatio >= 1 ? 'auto' : '100%',
            aspectRatio: 1,
            borderRadius: 24,
            marginInlineEnd: margin,
            opacity,
          }}/> : null}
      </div>
    </div>
  );
};

export default ScreenshotComponent;
