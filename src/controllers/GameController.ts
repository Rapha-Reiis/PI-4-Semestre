import { Request, Response } from 'express';

import { ErrorBadRequest } from '../core/Error/ErrorBadRequest';
import { GameListUseCase } from '../core/useCases/games/GameListUseCase';
import { GameGetGenresUseCase } from '../core/useCases/games/GameGetGenresUseCase';
import { GameGetByIdUseCase } from '../core/useCases/games/GameGetByIdUseCase';

export class GameController {
    constructor(
        private readonly listUseCase: GameListUseCase,
        private readonly genres: GameGetGenresUseCase,
        private readonly gameById: GameGetByIdUseCase,
    ) {}

    ListOfGame = async (req: Request, res: Response): Promise<Response> => {
        const pageNumber = (req.query.page as string) ?? '1';
        const pageSizeNumber = (req.query.pageSize as string) ?? '10';
        const search = (req.query.search as string) || null || undefined;
        const genre = (req.query.genre as string) || null || undefined;

        const games = await this.listUseCase.execute(pageNumber, pageSizeNumber, search, genre);

        return res.status(200).json(games);
    };

    ListGenre = async (req: Request, res: Response): Promise<Response> => {
        const genres = await this.genres.execute();
        return res.status(200).json(genres);
    };

    GameById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        if (!id) throw new ErrorBadRequest('Faltando passar o ID');
        const game = await this.gameById.execute(id);

        return res.status(200).json(game);
    };
}
