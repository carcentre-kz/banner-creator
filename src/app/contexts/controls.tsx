'use client';

import {createContext, Dispatch, SetStateAction} from 'react';

export type ControlsrContextProps = {
    allowScreenshot: [boolean, Dispatch<SetStateAction<boolean>>];
    padding: [number, Dispatch<SetStateAction<number>>];
    opacity: [number, Dispatch<SetStateAction<number>>];
    margin: [number, Dispatch<SetStateAction<number>>];
    aspectRatio: [number, Dispatch<SetStateAction<number>>];
    currentImage: [number | null, Dispatch<SetStateAction<number| null>>];
    color1: [string, Dispatch<SetStateAction<string>>];
    color2: [string, Dispatch<SetStateAction<string>>];
    images: [string[], Dispatch<SetStateAction<string[]>>];
};

export const ControlsrContext = createContext<ControlsrContextProps>({
    allowScreenshot: [false, () => null],
    padding: [1, () => null],
    opacity: [0, () => null],
    margin: [0, () => null],
    aspectRatio: [0, () => null],
    currentImage: [0, () => null],
    color1: ['#eee', () => null],
    color2: ['#000', () => null],
    images: [[], () => null],
});
