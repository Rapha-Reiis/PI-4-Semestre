import { any, map } from 'zod';
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
    const urlDetails = `https://api.rawg.io/api/games/4233?key=${API_KEY}`;
    const urlScreen = `https://api.rawg.io/api/games/4233/screenshots?key=${API_KEY}`;

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

async function getAll() {
    const url = `https://api.rawg.io/api/games/3328?key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Errr, status: ${response.status}`);

    const data = await response.json();

    console.log(data);
    console.log('--------------------');

    const games = {
        id: data.id,
        name: data.name,
        description: data.description,
        metacritic: data.metacritic,
        released: data.released,
        background_image: data.background_image,
        website: data.website,
        playtime: data.playtime,
        platforms: data.platforms.map((g: any) => ({ id: g.platform.id, name: g.platform.name })),
        genres: [data.genres.map((g: any) => ({ id: g.id, name: g.name }))],
    };

    console.log(JSON.stringify(games, null, 2));
}

(async () => {
    const games = await getAll();
    // console.log(JSON.stringify(games, null, 2));
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
