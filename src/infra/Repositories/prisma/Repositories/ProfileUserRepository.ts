import { Prisma, PrismaClient, UserGame } from '@prisma/client';
import { IGameRepository } from '../../../../adapters/Repositories/IGamesRepository';
import { IProfileRepository } from '../../../../adapters/Repositories/IProfileRepository';
import { ProfileCreateDTO, ProfileUpdateDTO } from '../../../../core/Entities/Profile';
import { ErrorApp } from '../../../../core/Error/ErrorApp';
import { prisma } from '../client';

export class ProfileUserRepository implements IProfileRepository {
    constructor(private repository: IGameRepository) {}

    async createUserProfile(profile: ProfileCreateDTO): Promise<any> {
        const rawgId = Number(profile.rawgId);
        const data: Prisma.UserGameCreateInput = {
            rawgId,
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

    async getUserProfile(userId: string): Promise<any> {
        try {
            const userGames = await prisma.userGame.findMany({
                where: { userId },
                select: {
                    id: true,
                    userId: true,
                    rawgId: true,
                    status: true,
                    note: true,
                },
            });
            if (userGames.length === 0) {
                return [];
            }

            const userWithGame = await Promise.all(
                userGames.map(async (user: any) => {
                    const game = await this.repository.getByIdSimple(user.rawgId);
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

    async VerifyGameWithUser(userId: string, rawgId: string): Promise<any> {
        const idRawg = Number(rawgId);
        try {
            let exist = false;
            const profile = await prisma.userGame.findFirst({
                where: { userId: userId, rawgId: idRawg },
            });

            if (profile) exist = true;

            return exist;
        } catch (err) {
            throw new ErrorApp('Erro ao consultar o banco', 500, err);
        }
    }
}
