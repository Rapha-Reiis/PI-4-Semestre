import { IGameRepository } from '../../../adapters/Repositories/IGamesRepository';
import 'dotenv/config';
import { ErrorApp } from '../../../core/Error/ErrorApp';
import { RawgGameList, RawgGenre, RawgGenres } from '../../../core/Entities/GameEntity';
import { ErrorBadRequest } from '../../../core/Error/ErrorBadRequest';

export class RawgRepostiry implements IGameRepository {
    private API_KEY = process.env.KAY_RAWG ?? '';

    async gameList(page: string = '1', pageSize: string = '10', search?: string, genres?: string): Promise<RawgGameList[]> {
        const url = `https://api.rawg.io/api/games?key=${this.API_KEY}&genres=${genres ?? ''}&search=${search ?? ''}&page=${page}&page_size=${pageSize}`;

        const response = await fetch(url);
        if (!response.ok) throw new ErrorApp('Sem response da RAWG', response.status, response.text);
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

    async getById(rawgId: number): Promise<RawgGenres> {
        throw new ErrorBadRequest();
    }

    async getListGen(): Promise<any> {
        const url = `https://api.rawg.io/api/genres?key=${this.API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) throw new ErrorApp('Erro no response RAWG', response.status, await response.text);

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
