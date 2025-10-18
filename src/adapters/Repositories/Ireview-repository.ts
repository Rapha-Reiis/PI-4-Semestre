import { ReviewCreateDTO, reviewListFeed, reviewListUserParams, ReviewUpdateDTO } from '../../core/Entities/review-entity';

export interface IReviewRepository {
    create(data: ReviewCreateDTO): Promise<{ id: string }>;
    update(data: ReviewUpdateDTO): Promise<any>;
    reviewListFeed(data: reviewListFeed): Promise<any>;
    reviewListByUser(data: reviewListUserParams): Promise<any>;
    reviewById(reviwId: string): Promise<any>;
    verifyDuplicateReview(userId: string, gameId: number): Promise<boolean>;
}
