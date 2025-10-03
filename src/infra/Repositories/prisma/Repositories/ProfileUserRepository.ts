import { IGameRepository } from '../../../../adapters/Repositories/IGamesRepository';
import { IProfileRepository } from '../../../../adapters/Repositories/IProfileRepository';
import { ProfileCreateDTO, ProfileUpdateDTO } from '../../../../core/Entities/Profile';
import { ErrorApp } from '../../../../core/Error/ErrorApp';
import { prisma } from '../client';

export class ProfileUserRepository implements IProfileRepository {
    constructor(private repository: IGameRepository) {}

    async createUserProfile(data: ProfileCreateDTO): Promise<any> {
        try {
            const profile = await prisma.userGame.create({
                data,
            });

            return profile;
        } catch (err) {
            throw new ErrorApp('Erro no repository ao cadastrar no perfil', 500, err);
        }
    }

    async getUserProfile(userId: string): Promise<any> {
        try {
            const userGames = await prisma.userGame.findMany({
                where: { userId },
                select: {
                    id: true,
                    userId: true,
                    rawgId: true,
                    status: true,
                    rating: true,
                    note: true,
                    review: true,
                },
            });
            if (userGames.length === 0) {
                return [];
            }

            const userWithGame = await Promise.all(
                userGames.map(async (user: any) => {
                    const game = await this.repository.getById(user.rawgId);
                    return {
                        ...user,
                        game: game,
                    };
                }),
            );

            return userWithGame;
        } catch (err) {
            throw new ErrorApp('Erro ao buscar o games do perfil no repositório', 500);
        }
    }

    async UpdateDataProfile(data: ProfileUpdateDTO): Promise<any> {
        console.log(data.rating);
        try {
            const select = {
                status: !!data.status,
                rating: !!data.rating,
                note: !!data.note,
                review: !!data.review,
            };

            const perfilUpdate = await prisma.userGame.update({
                where: { id: data.id },
                data,
                select,
            });

            console.log('update:', perfilUpdate);

            return perfilUpdate;
        } catch (err) {
            throw new ErrorApp('Erro ao atualizar o perfil no repositório', 500, err);
        }
    }
}
