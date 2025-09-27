export interface IImageStorage {
    deleteByUrl(url?: string): Promise<void>;
    deleteByIDImage(idImage: string): Promise<void>;
}
