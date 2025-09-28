import { response } from 'express';
import { get } from 'http';
import { platform, release } from 'os';
import { json } from 'zod';
import { id } from 'zod/locales';

const API_KEY = '5e603e9140c64ab38e6f3af8dac1f767';
const search = 'The Witcher';
const page = 1;
const pageSize = 2; //----1

// const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${search}&page=${page}&page_size=${pageSize}`;
// const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;
// const url = `https://api.rawg.io/api/games/3328/achievements?key=${API_KEY}`;
// const url = `https://api.rawg.io/api/games/3328/movies?key=${API_KEY}`;
// const url = `https://api.rawg.io/api/games/3328/additions?key=${API_KEY}`;
// const url = `https://api.rawg.io/api/games/3328/screenshots?key=${API_KEY}`; // - 2

async function getGames() {
    const urlDetails = `https://api.rawg.io/api/games/3328?key=${API_KEY}`;
    const urlScreen = `https://api.rawg.io/api/games/3328/screenshots?key=${API_KEY}`;

    const [detailRes, shotsRes] = await Promise.all([fetch(urlDetails), fetch(urlScreen)]);
    if (!detailRes.ok) throw new Error(`Erro, ${detailRes.status}`);
    if (!shotsRes.ok) throw new Error(`Erro, ${shotsRes.status}`);
    const data = await detailRes.json();
    const screens = await shotsRes.json();

    const {
        id,
        slug,
        name,
        name_original,
        description,
        metacritic,
        released,
        background_image_additional,
        website,
        metacritic_url,
        platforms,
        developers,
        genres,
        publishers,
        description_raw,
        background_imag,
    } = data;

    const games = {
        id,
        slug,
        name,
        name_original,
        description,
        metacritic,
        released,
        background_imag,
        background_image_additional,
        website,
        metacritic_url,
        platforms,
        developers,
        genres,
        publishers,
        description_raw,
        screen_shots: screens.results,
    };

    return games;
}

(async () => {
    const games = await getGames();
    console.log(JSON.stringify(games, null, 2));
})().catch(console.error);

// -----------------------------------------------

export interface RawgGenres {
    id: number;
    name: string;
    slug: string;
    image_background: string;
}

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

export interface RawgGame {
    rawgId: number;
    name: string;
    slug: string;
    released: string | null;
    background_image: string | null;
    metacritic: number | null;
    platforms: RawgPlatform[];
    genres: RawgGenre[];
    developers?: { id: number; name: string }[];
    publishers?: { id: number; name: string }[];
}
