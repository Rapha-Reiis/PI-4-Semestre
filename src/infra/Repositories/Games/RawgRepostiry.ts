import { IGameRepository } from '../../../adapters/Repositories/IGamesRepository';
import 'dotenv/config';
import { RawgGameDetails, RawgGameList, RawgGenre, RawgGenres } from '../../../core/Entities/GameEntity';
import { ErrorRawg } from '../../../util/ErrorRawg';
import { ErrorApp } from '../../../core/Error/ErrorApp';

export class RawgRepostiry implements IGameRepository {
    private API_KEY = process.env.KAY_RAWG ?? '';

    async gameList(page: string = '1', pageSize: string = '10', search?: string, genres?: string): Promise<RawgGameList[]> {
        let url = `https://api.rawg.io/api/games?key=${this.API_KEY}&page=${page}&page_size=${pageSize}`;
        if (search) url += `&search=${search}`;
        if (genres) url += `&genres=${genres}`;

        const response = await fetch(url);
        if (!response.ok) ErrorRawg(response.status);
        const data = await response.json();

        const games: RawgGameList[] = data.results.map((item: any) => ({
            rawgId: item.id,
            name: item.name,
            slug: item.slug,
            released: item.released ?? null,
            background_image: item.background_image ?? null,
            metacritic: item.metacritic ?? null,

            genres: (item.genres ?? []).map((gen: RawgGenre) => ({
                id: gen.id,
                name: gen.name,
            })),

            platforms: (item.platforms ?? []).map((p: any) => ({
                id: p.platform.id,
                name: p.platform.name,
            })),
        }));

        return games;
    }

    async getById(rawgId: string): Promise<RawgGameDetails> {
        const urlDetails = `https://api.rawg.io/api/games/${rawgId}?key=${this.API_KEY}`;
        const urlScreen = `https://api.rawg.io/api/games/${rawgId}/screenshots?key=${this.API_KEY}`;

        const [detailRes, shotsRes] = await Promise.all([fetch(urlDetails), fetch(urlScreen)]);

        if (!detailRes.ok) ErrorRawg(detailRes.status);
        if (!shotsRes.ok) ErrorRawg(detailRes.status);

        const [data, screens] = await Promise.all([detailRes.json(), shotsRes.json()]);

        const {
            id,
            slug,
            name,
            name_original,
            description,
            metacritic,
            released,
            background_image,
            background_image_additional,
            website,
            metacritic_url,
            platforms,
            developers,
            genres,
            publishers,
            description_raw,
        } = data;

        const games = {
            id,
            slug,
            name,
            name_original,
            description,
            metacritic,
            released,
            background_image,
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

    async getByIdSimple(rawgId: string): Promise<any> {
        const urlDetails = `https://api.rawg.io/api/games/${rawgId}?key=${this.API_KEY}`;

        const response = await fetch(urlDetails);
        if (!response.ok) ErrorRawg(response.status);
        const data = await response.json();

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

        return games;
    }

    async getListGen(): Promise<any> {
        const url = `https://api.rawg.io/api/genres?key=${this.API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) ErrorRawg(response.status);

        const data = await response.json();

        const genres: RawgGenres[] = data.results.map(
            (generos: any) =>
                ({
                    id: generos.id,
                    name: generos.name,
                    slug: generos.slug,
                    image_background: generos.image_background,
                }) as RawgGenres,
        );

        return genres;
    }
}
