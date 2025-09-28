import { RawgGameList } from '../../core/Entities/GameEntity';

export interface IGameRepository {
    gameList(page: number, pageSize: number, search?: string): Promise<RawgGameList[]>;
    getById(rawgId: number): Promise<any>;
}
