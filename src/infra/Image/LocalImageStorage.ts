import path from 'path';
import { IImageStorage } from '../../adapters/IImageStorage';
import fs from 'fs';

export class LocalImageStorage implements IImageStorage {
    async deleteByUrl(url: string): Promise<void> {
        const oldName = url?.split('/').pop();
        let pathImage: string = '';
        if (oldName) {
            pathImage = path.join(__dirname, '..', '..', '..', 'upload', 'profile', path.basename(oldName));
        }

        if (fs.existsSync(pathImage)) {
            await fs.unlinkSync(pathImage);
        }
    }

    async deleteByIDImage(idImage: string): Promise<void> {
        let pathImage: string = path.join(__dirname, '..', '..', '..', 'upload', 'profile', path.basename(idImage));

        if (fs.existsSync(pathImage)) {
            await fs.unlinkSync(pathImage);
        }
    }
}
