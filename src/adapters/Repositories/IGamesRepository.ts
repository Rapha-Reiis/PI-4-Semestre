import { RawgGameDetails, RawgGameList, RawgGenres } from '../../core/Entities/GameEntity';

export interface IGameRepository {
    gameList(page: string, pageSize: string, search?: string, genres?: string): Promise<RawgGameList[]>;
    getById(rawgId: string): Promise<RawgGameDetails>;
    getByIdSimple(rawgId: string): Promise<any>;
    getListGen(): Promise<RawgGenres>;
}
