import { IReviewRepository } from '../../../adapters/Repositories/Ireview-repository';
import { reviewListParams } from '../../Entities/review-entity';

export class ReviewListFeedUsecase {
    constructor(private repository: IReviewRepository) {}

    async execute(reviewParam: reviewListParams) {
        return await this.repository.reviewListFeed(reviewParam);
    }
}
