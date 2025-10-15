import { Prisma, PrismaClient } from '@prisma/client';
import { IReviewRepository } from '../../../../adapters/Repositories/Ireview-repository';
import { ReviewCreateDTO, ReviewUpdateDTO } from '../../../../core/Entities/review-entity';
import { prisma } from '../client';
import { ErrorApp } from '../../../../core/Error/erro-app';

export class ReviwRepository implements IReviewRepository {
    constructor(private prisma: PrismaClient) {
        prisma = prisma;
    }

    async create(userGame: ReviewCreateDTO): Promise<{ id: string }> {
        try {
            const data: Prisma.ReviewCreateInput = {
                author: { connect: { id: userGame.userId } },
                gameId: Number(userGame.gameId),
                title: userGame.title,
                body: userGame.body ?? null,
                rating: userGame.rating,
                isPublic: userGame.isPublic ?? false,
                status: userGame.status,
                published_at: userGame.published_at ?? null,
            };
            const output = await prisma.review.create({
                data,
                select: { id: true },
            });

            return output;
        } catch (err) {
            throw new ErrorApp('Erro ao registrar review no banco', 500, err);
        }
    }

    async update(review: ReviewUpdateDTO) {
        try {
            const update: Prisma.ReviewUpdateInput = {
                title: review.title,
                body: review.body,
                rating: review.rating,
                status: review.status,
                isPublic: review.isPublic,
                published_at: review.published_at,
            };

            const customSelect = {
                id: true,
                title: !!review.title,
                body: !!review.body,
                rating: !!review.rating,
                status: !!review.status,
                isPublic: !!review.isPublic,
                published_at: !!review.published_at,
            };

            const data = await prisma.review.update({
                where: { id: review.id },
                data: update,
                select: customSelect,
            });

            return data;
        } catch (err) {
            throw new ErrorApp('Erro ao atualizar review no banco', 500, err);
        }
    }

    async reviewById(reviwId: string): Promise<any> {
        try {
            const review = await prisma.review.findUnique({
                where: { id: reviwId },
            });

            return review;
        } catch (err) {
            throw new ErrorApp('Erro ao buscar review pelo ID', 500, err);
        }
    }

    async verifyDuplicateReview(userId: string, gameId: number): Promise<boolean> {
        const game = Number(gameId);
        try {
            const exist = await prisma.review.findUnique({
                where: { userId_rawgId: { userId, gameId: game } },
                select: { id: true },
            });
            return !!exist;
        } catch (err) {
            throw new ErrorApp('Erro ao verificar duplicata de review no repositório', 500, err);
        }
    }
}
