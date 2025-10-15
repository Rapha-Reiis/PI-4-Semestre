import { ReviewCreateDTO, ReviewUpdateDTO } from '../core/Entities/review-entity';
import { ErrorBadRequest } from '../core/Error/error-bad-request';
import { ReviewCreateUsecase } from '../core/useCases/review/review-create.usecase';
import { Request, response, Response } from 'express';
import { ReviewUpdateUsecase } from '../core/useCases/review/review-update.usecase';

export class ReviewController {
    constructor(
        private createReview: ReviewCreateUsecase,
        private updateReview: ReviewUpdateUsecase,
    ) {}

    create = async (req: Request, res: Response) => {
        const { userId, gameId, title, body, rating, status, isPublic } = req.body;
        const createDTO: ReviewCreateDTO = {
            userId,
            gameId,
            body,
            rating,
            status,
            title,
            isPublic,
        };

        const output = await this.createReview.execute(createDTO);

        res.status(201).json(output);
    };

    update = async (req: Request, res: Response) => {
        const { title, body, rating, status, isPublic } = req.body;
        const { idReview } = req.params;
        if (!idReview) throw new ErrorBadRequest('IdReview não foi passado');
        const updateDTO: ReviewUpdateDTO = {
            id: idReview,
            title,
            body,
            rating,
            status,
            isPublic,
        };

        const output = await this.updateReview.execute(updateDTO);

        res.status(200).json(output);
    };
}
