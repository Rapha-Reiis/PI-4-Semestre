import { GameController } from '../controllers/GameController';
import { ListGameUseCase } from '../core/useCases/games/ListGameUseCase';
import { RawgRepostiry } from '../infra/Repositories/Games/RawgRepostiry';

export function makeGamesController() {
    const gameRepo = new RawgRepostiry();

    const ListUseCase = new ListGameUseCase(gameRepo);

    return new GameController(ListUseCase);
}
