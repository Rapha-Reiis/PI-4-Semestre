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

export interface RawgGameDetails {
    id: number;
    slug: string;
    name: string;
    name_original: string;
    description: string;
    description_raw: string;
    metacritic: number | null;
    released: string | null;
    background_image: string | null;
    background_image_additional: string | null;
    website: string | null;
    metacritic_url: string | null;
    platforms: RawgPlatform[];
    developers: RawgCompany[];
    genres: RawgGenre[];
    publishers: RawgCompany[];
    screen_shots: RawgScreenshot[];
}

export interface RawgPlatformInfo {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    year_end: number | null;
    year_start: number | null;
    games_count: number;
    image_background: string;
}

export interface RawgPlatform {
    platform: RawgPlatformInfo;
}

export interface RawgCompany {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface RawgGenre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface RawgScreenshot {
    id: number;
    image: string;
    width: number;
    height: number;
    is_deleted: boolean;
}
