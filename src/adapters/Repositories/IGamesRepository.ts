import { RawgGameList } from '../../core/Entities/GameEntity';

export interface IGameRepository {
    gameList(page: string, pageSize: string, search?: string, genres?: string): Promise<RawgGameList[]>;
    getById(rawgId: number): Promise<any>;
}
