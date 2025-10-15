import { ReviewCreateDTO, ReviewUpdateDTO } from '../core/Entities/review-entity';
import { ErrorBadRequest } from '../core/Error/error-bad-request';
import { ReviewCreateUsecase } from '../core/useCases/review/review-create.usecase';
import { Request, Response } from 'express';
import { ReviewUpdateUsecase } from '../core/useCases/review/review-update.usecase';
import { ReviewGetByIdUsecase } from '../core/useCases/review/review-get-by-id.usecase';

export class ReviewController {
    constructor(
        private createReview: ReviewCreateUsecase,
        private updateReview: ReviewUpdateUsecase,
        private getByIdreviewU: ReviewGetByIdUsecase,
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
        const { reviewId } = req.params;
        if (!reviewId) throw new ErrorBadRequest('IdReview não foi passado');
        const updateDTO: ReviewUpdateDTO = {
            id: reviewId,
            title,
            body,
            rating,
            status,
            isPublic,
        };

        const output = await this.updateReview.execute(updateDTO);

        res.status(200).json(output);
    };

    getById = async (req: Request, res: Response) => {
        const { reviewId } = req.params;
        if (!reviewId) throw new ErrorBadRequest('Não foi passado o reviewId');
        const output = await this.getByIdreviewU.execute(reviewId);
        res.status(200).json(output);
    };
}
