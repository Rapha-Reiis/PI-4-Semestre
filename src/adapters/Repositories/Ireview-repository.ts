import { ReviewCreateDTO, ReviewUpdateDTO } from '../../core/Entities/review-entity';

export interface IReviewRepository {
    create(data: ReviewCreateDTO): Promise<{ id: string }>;
    update(data: ReviewUpdateDTO): Promise<any>;
    reviewById(reviwId: string): Promise<any>;
    verifyDuplicateReview(userId: string, gameId: number): Promise<boolean>;
}
