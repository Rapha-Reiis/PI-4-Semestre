import { Request, Response } from 'express';
import { ListGameUseCase } from '../core/useCases/games/ListGameUseCase';

export class GameController {
    constructor(private readonly listUseCase: ListGameUseCase) {}

    ListOfGame = async (req: Request, res: Response): Promise<Response> => {
        const pageNumber = (req.query.page as string) ?? '1';
        const pageSizeNumber = (req.query.pageSize as string) ?? '10';
        const search = (req.query.search as string) || null || undefined;
        const genre = (req.query.genre as string) || null || undefined;
        console.log(genre);

        const games = await this.listUseCase.execute(pageNumber, pageSizeNumber, search, genre);

        return res.status(201).json(games);
    };
}
