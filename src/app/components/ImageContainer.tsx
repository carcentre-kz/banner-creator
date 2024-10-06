'use client';

import { useEffect, useRef } from "react";
import { useControls } from "../hooks/controls";
import Image from "next/image";
import html2canvas from 'html2canvas';
import { getImages } from '@/server/actions/images';
import useLocalStorage from "../hooks/localStorage";

export const ImageContainer = () => {
    const sectionRef = useRef(null);
    const {save} = useLocalStorage();

    const {
        opacity: [opacity],
        aspectRatio: [aspectRatio],
        color1: [color1],
        color2: [color2],
        padding: [padding],
        currentImage: [currentImage, setCurrentImage],
        images: [images, setImages],
        margin: [margin],
        allowScreenshot: [allowScreenshot, setAllowScreenshot],
      } = useControls();


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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
    
        
      }, [allowScreenshot, currentImage, images, setAllowScreenshot, setCurrentImage]);
    
      useEffect(() => {
        console.log('useEffect 2', allowScreenshot, currentImage);
        if (allowScreenshot && currentImage !== null) {
          takeScreenshot();
          setTimeout(() => {
            setCurrentImage(currentImage + 1);
          }, 1000);
        }
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

      console.log('currentImage', currentImage, images);
    return <div ref={sectionRef} style={
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
            // clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 30% 100%, 00% 50%)'
          }}/> : null}
      </div>;
}