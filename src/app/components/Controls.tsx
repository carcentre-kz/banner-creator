import { useState } from 'react';
import { useControls } from '../hooks/controls';
import styles from '../page.module.css';
import { AppearanceControls } from './AppearanceControls';
import { AspectRatioControls } from './AspectRatioControls';
import { Input } from './Input';
import { PositionControls } from './PositionControls';

enum Tab {
  Position = 'position',
  Appearance = 'appearance',
  AspectRatio = 'aspect ratio',
}

export const Controls = () => {
    const {
        allowScreenshot: [allowScreenshot, setAllowScreenshot],
        allowSingleScreenshot: [allowSingleScreenshot, setAllowSingleScreenshot],
        currentImage: [currentImage, setCurrentImage],
        images: [images],
      } = useControls();
      const [tab, setTab] = useState(Tab.Position);

    return     <div className={styles.controls}>
    <Input label={`images ${images.length}`} type="number" value={currentImage ?? ''} onChange={(e) => setCurrentImage(Number(e.target.value))} />
    <div className={styles.tabs}>
      {Object.values(Tab).map((tabVal) => {
        return <button key={tabVal} onClick={() => setTab(tabVal)}>{tabVal}</button>;
      })}
    </div>
    {tab === Tab.Position ? <PositionControls /> : null}
    {tab === Tab.Appearance ? <AppearanceControls /> : null}
    {tab === Tab.AspectRatio ? <AspectRatioControls /> : null}
    
    
    <button 
      style={{
        margin: 12,
        padding: 12,
        background: 'red',
        width: '100%'
      }}
      onClick={() => setAllowScreenshot(!allowScreenshot)}>
        {allowScreenshot ? 'Stop' : 'Run'}
    </button>
    <button 
      style={{
        margin: 12,
        padding: 12,
        background: 'red',
        width: '100%'
      }}
      onClick={() => setAllowSingleScreenshot(!allowSingleScreenshot)}>
        Single screenshot
    </button>
  </div>
}