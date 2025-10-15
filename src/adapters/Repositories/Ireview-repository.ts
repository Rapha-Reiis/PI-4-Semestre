import { ReviewCreateDTO } from '../../core/Entities/review-entity';

export interface IReviewRepository {
    create(data: ReviewCreateDTO): Promise<{ id: string }>;
    verifyDuplicateReview(userId: string, gameId: number): Promise<boolean>;
}
