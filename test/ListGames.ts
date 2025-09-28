import { release } from 'os';
import { json } from 'zod';

async function getGames() {
    const API_KEY = '5e603e9140c64ab38e6f3af8dac1f767';
    const search = 'The Witcher';
    const page = 1;
    const pageSize = 2;

    // const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${search}&page=${page}&page_size=${pageSize}`;
    const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;

    try {
        console.log('Cheguei');
        const repsonse = await fetch(url);
        if (!repsonse.ok) throw new Error(`Errro  na requisição: ${repsonse.status}`);

        const data = await repsonse.json();
        // const games: RawgGame[] = data.results.map((item: any) => ({
        //     rawgID: item.id,
        //     name: item.name,
        //     slug: item.slug,
        //     released: item.released ?? null,
        //     background_image: item.background_image ?? null,
        //     metacritic: item.metacritic ?? null,

        //     platforms: (item.platforms ?? []).map((p: RawgPlatform) => ({
        //         id: p.id,
        //         name: p.name,
        //     })),

        //     genres: (item.genres ?? []).map((ge: RawgGenre) => ({
        //         id: ge.id,
        //         name: ge.name,
        //     })),
        // }));

        console.log(JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Erro ao buscar o jogo ', err);
    }
}

getGames();

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
