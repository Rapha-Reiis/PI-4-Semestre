export interface RawgPlatform {
    id: number;
    name: string;
    slug: string;
}

export interface RawgGenre {
    id: number;
    name: string;
    slug: string;
}

export interface RawgScreenShots {
    id: number;
    image: string;
}

export interface RawgGenres {
    id: number;
    name: string;
    slug: string;
    image_background: string;
}

export interface RawgGameList {
    rawgId: number;
    name: string;
    slug: string;
    released: string | null;
    background_image: string | null;
    metacritic: number | null;
    genres: RawgGenre[];
    platforms: RawgPlatform[];
}
