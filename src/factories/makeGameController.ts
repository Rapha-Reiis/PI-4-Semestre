import { GameController } from '../controllers/GameController';
import { GameGetGenresUseCase } from '../core/useCases/games/GameGetGenresUseCase';
import { GameGetByIdUseCase } from '../core/useCases/games/GameGetByIdUseCase';
import { GameListUseCase } from '../core/useCases/games/GameListUseCase';
import { RawgRepostiry } from '../infra/Repositories/Games/RawgRepostiry';

export function makeGamesController() {
    const gameRepo = new RawgRepostiry();

    const ListUseCase = new GameListUseCase(gameRepo);
    const genreUseCase = new GameGetGenresUseCase(gameRepo);
    const getByIdUseCase = new GameGetByIdUseCase(gameRepo);

    return new GameController(ListUseCase, genreUseCase, getByIdUseCase);
}
