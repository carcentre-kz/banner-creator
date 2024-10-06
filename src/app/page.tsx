'use client';

import React, {useState } from 'react';
import useLocalStorage from './hooks/localStorage';

import styles from './page.module.css';
import { ControlsrContext } from './contexts/controls';
import { Controls } from './components/Controls';
import { ImageContainer } from './components/ImageContainer';

const ScreenshotComponent = () => {
  const {load} = useLocalStorage();
  const allowScreenshotState = useState(false);
  const paddingState = useState(Number(load('padding') ?? 120));
  const opacityState = useState(Number(load('opacity') ?? 1));
  const marginState = useState(Number(load('margin') ?? 0));
  const aspectRatioState = useState(Number(load('aspectRatio') ?? 1))
  const borderRadiusState = useState(Number(load('borderRadius') ?? 1))
  const currentImageState = useState<number | null>(null)

  const color1State = useState(load('color1') ?? '#ccc');
  const color2State = useState(load('color2') ?? '#000');
  const clipPathState = useState(load('clipPath') ?? '0% 0%, 100% 0%, 100% 100%, 0% 100%');

  const imagesState = useState<string[]>([]);

  return (
    <ControlsrContext.Provider value={{
      allowScreenshot: allowScreenshotState,
      padding: paddingState,
      opacity: opacityState,
      margin: marginState,
      aspectRatio: aspectRatioState,
      currentImage: currentImageState,
      color1: color1State,
      color2: color2State,
      images: imagesState,
      clipPath: clipPathState,
      borderRadius: borderRadiusState,
    }}>

    <div className={styles.page}>
      <Controls />
      <ImageContainer />
    </div>
    </ControlsrContext.Provider>
  );
};

export default ScreenshotComponent;
