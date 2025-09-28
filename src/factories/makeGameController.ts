import { GameController } from '../controllers/GameController';
import { GenresUseCase } from '../core/useCases/games/GenresUseCase';
import { getGameByIdUseCase } from '../core/useCases/games/getGameByIdUseCase';
import { ListGameUseCase } from '../core/useCases/games/ListGameUseCase';
import { RawgRepostiry } from '../infra/Repositories/Games/RawgRepostiry';

export function makeGamesController() {
    const gameRepo = new RawgRepostiry();

    const ListUseCase = new ListGameUseCase(gameRepo);
    const genreUseCase = new GenresUseCase(gameRepo);
    const getByIdUseCase = new getGameByIdUseCase(gameRepo);

    return new GameController(ListUseCase, genreUseCase, getByIdUseCase);
}
