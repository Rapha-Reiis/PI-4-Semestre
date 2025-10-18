import { IReviewRepository } from '../../../adapters/Repositories/Ireview-repository';
import { reviewListUserParams } from '../../Entities/review-entity';
import { ErrorBadRequest } from '../../Error/error-bad-request';

export class ReviewListByUserUsecase {
    constructor(private repositoty: IReviewRepository) {}

    public async execute(reviewListParam: reviewListUserParams) {
        this.validate(reviewListParam);
        return await this.repositoty.reviewListByUser(reviewListParam);
    }

    private validate(reviewListParam: reviewListUserParams) {
        const { status } = reviewListParam;
        if (status) {
            if (!['PUBLISHED', 'DRAFT'].includes(status)) throw new ErrorBadRequest('Parâmetro status não é valido');
        }
    }
}
