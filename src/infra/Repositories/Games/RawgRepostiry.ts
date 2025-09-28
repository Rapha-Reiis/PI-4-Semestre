import { IGameRepository } from '../../../adapters/Repositories/IGamesRepository';
import 'dotenv/config';
import { ErrorApp } from '../../../core/Error/ErrorApp';
import { RawgGameList, RawgGenre } from '../../../core/Entities/GameEntity';

export class RawgRepostiry implements IGameRepository {
    private API_KEY = process.env.KAY_RAWG;

    async gameList(page: number = 1, pageSize: number = 10, search?: string): Promise<RawgGameList[]> {
        const url = `https://api.rawg.io/api/games?key=${this.API_KEY}&search=${search}&page=${page}&page_size=${pageSize}`;
        try {
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
        } catch (err) {
            throw new ErrorApp('Erro ao fazer requisição com a RAWG', 500, err);
        }
    }

    getById(rawgId: number): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
