import { ReviewCreateDTO } from '../core/Entities/review-entity';
import { ReviewCreateUsecase } from '../core/useCases/review/review-create.usecase';
import { Request, response, Response } from 'express';

export class ReviewController {
    constructor(private createReview: ReviewCreateUsecase) {}

    create = async (req: Request, res: Response) => {
        const { userId, gameId, title, body, rating, status, isPublic, published_at } = req.body;
        const createDTO: ReviewCreateDTO = {
            userId,
            gameId,
            body,
            rating,
            status,
            title,
            isPublic,
            published_at,
        };

        const output = await this.createReview.execute(createDTO);

        res.status(201).json(output);
    };
}
