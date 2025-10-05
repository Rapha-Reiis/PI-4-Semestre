import { GameCompact, gameComplete, GameGenres } from '../../core/Entities/GameEntity';

export interface IGameRepository {
    gameList(page: string, pageSize: string, search?: string, genres?: string): Promise<GameCompact[]>;
    getById(rawgId: string): Promise<gameComplete>;
    getByIdSimple(rawgId: string): Promise<GameCompact>;
    getListGen(): Promise<GameGenres[]>;
}
