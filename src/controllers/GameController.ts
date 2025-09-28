import { Request, Response } from 'express';
import { ListGameUseCase } from '../core/useCases/games/ListGameUseCase';

export class GameController {
    constructor(private readonly listUseCase: ListGameUseCase) {}

    ListOfGame = async (req: Request, res: Response): Promise<Response> => {
        const pageNumber = Number(req.query.page ?? 1);
        const pageSizeNumber = Number(req.query.pageSize ?? 5);
        const search = (req.query.search as string) || undefined;

        const games = await this.listUseCase.execute(pageNumber, pageSizeNumber, search);

        return res.status(201).json(games);
    };
}
