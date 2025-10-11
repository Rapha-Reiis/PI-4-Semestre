import { GameStatus, Prisma } from '@prisma/client';
import { IGameRepository } from '../../../../adapters/Repositories/IGamesRepository';
import { IProfileRepository } from '../../../../adapters/Repositories/IProfileRepository';
import { ProfileCreateDTO, ProfileUpdateDTO } from '../../../../core/Entities/Profile';
import { ErrorApp } from '../../../../core/Error/ErrorApp';
import { prisma } from '../client';

export class ProfileUserRepository implements IProfileRepository {
    constructor(private repository: IGameRepository) {}

    async createUserProfile(profile: ProfileCreateDTO): Promise<any> {
        const gameId = Number(profile.gameId);
        const data: Prisma.UserGameCreateInput = {
            gameId: gameId,
            status: profile.status,
            user: {
                connect: { id: profile.userId },
            },
            note: profile.note,
        };
        //
        try {
            const profile = await prisma.userGame.create({
                data,
            });

            return profile;
        } catch (err) {
            throw new ErrorApp('Erro no repository ao cadastrar no perfil', 500, err);
        }
    }

    async getUserProfile(userId: string, page: number = 1, limit: number = 4, status?: GameStatus): Promise<any> {
        try {
            const [data, total] = await Promise.all([
                prisma.userGame.findMany({
                    where: {
                        userId,
                        ...(status ? { status } : {}),
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { created_at: 'desc' },
                }),
                prisma.userGame.count({
                    where: { userId, ...(status ? { status } : {}) },
                }),
            ]);
            const totalPage = Math.ceil(total / limit);
            if (data.length === 0) {
                return [];
            }

            const userWithGame = await Promise.all(
                data.map(async (user: any) => {
                    const game = await this.repository.getByIdSimple(user.gameId);
                    return {
                        ...user,
                        game: game,
                    };
                }),
            );

            return {
                data: userWithGame,
                totalGames: total,
                totalPage,
                currentPage: page,
            };
        } catch (err) {
            throw new ErrorApp('Erro ao buscar o games do perfil no repositório', 500);
        }
    }

    async UpdateDataProfile(profileUpdate: ProfileUpdateDTO): Promise<any> {
        try {
            const data: Prisma.UserGameUpdateInput = {
                status: profileUpdate.status,
                note: profileUpdate.note,
            };
            //
            const select = {
                status: !!data.status,
                note: !!data.note,
            };
            //
            const perfilUpdate = await prisma.userGame.update({
                where: { id: profileUpdate.id },
                data,
                select,
            });

            return perfilUpdate;
        } catch (err) {
            throw new ErrorApp('Erro ao atualizar o perfil no repositório', 500, err);
        }
    }

    async VerifyGameWithUser(userId: string, rawgId: string): Promise<Boolean> {
        const idGame = Number(rawgId);
        console.log(idGame);
        console.log(rawgId);
        try {
            let exist = false;
            const profile = await prisma.userGame.findFirst({
                where: { userId: userId, gameId: idGame },
            });
            //
            if (profile) exist = true;
            //
            return exist;
        } catch (err) {
            throw new ErrorApp('Erro ao consultar o banco (verifyGameWithUser)', 500, err);
        }
    }
}
