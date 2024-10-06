'use server';

import {readdirSync} from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';

export const getImages = async () => {
    const dirpath = resolve(cwd(), 'public');
    const images = readdirSync(dirpath);
    return images;
};
