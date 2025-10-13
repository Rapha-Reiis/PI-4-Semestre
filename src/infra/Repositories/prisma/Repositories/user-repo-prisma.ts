import { Prisma, PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../../../adapters/Repositories/IUserRepository';
import { UserCreateDTO, UserResponseDTO, UserResponseWhitPasswordDTO, UserUpdateDTO } from '../../../../core/Entities/UserEntity';
import { ErrorApp } from '../../../../core/Error/ErrorApp';
import { prisma } from '../client';

export class UserRepoPrisma implements IUserRepository {
    constructor(private prisma: PrismaClient) {}

    private select = {
        id: true,
        name: true,
        email: true,
        username: true,
        profile_image_url: true,
        bio: true,
        premium: true,
        role: true,
    };

    async create(data: UserCreateDTO): Promise<UserResponseDTO> {
        try {
            return await this.prisma.user.create({
                data: data,
                select: this.select,
            });
        } catch (err) {
            throw new ErrorApp('Erro no createUser', 500, err);
        }
    }

    async update(data: UserUpdateDTO, id: string): Promise<any> {
        const selectUp = {
            id: true,
            name: !!data.name,
            email: !!data.email,
            username: !!data.username,
            profile_image_url: !!data.profile_image_url,
            bio: !!data.bio,
            premium: !!data.premium,
        };

        try {
            return await this.prisma.user.update({
                where: { id },
                data: data,
                select: selectUp,
            });
        } catch (err) {
            throw new ErrorApp('Erro no update', 500, err);
        }
    }

    async findByEmail(email: string): Promise<UserResponseDTO | null> {
        try {
            return await this.prisma.user.findUnique({
                where: { email },
                select: this.select,
            });
        } catch (err) {
            throw new ErrorApp('Erro no findByEmail', 500, err);
        }
    }

    async findById(id: string): Promise<UserResponseDTO | null> {
        try {
            return await this.prisma.user.findUnique({
                where: { id },
                select: this.select,
            });
        } catch (err) {
            throw new ErrorApp('Erro no findById', 500, err);
        }
    }

    async findByUsername(username: string): Promise<UserResponseDTO | null> {
        try {
            return await this.prisma.user.findUnique({
                where: { username },
                select: this.select,
            });
        } catch (err) {
            throw new ErrorApp('Erro no FindByUsername', 500, err);
        }
    }

    async findByEmailWithPassword(email: string): Promise<UserResponseWhitPasswordDTO | null> {
        try {
            return await this.prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                    premium: true,
                    password: true,
                },
            });
        } catch (err) {
            throw new ErrorApp('Erro no findByEmail', 500, err);
        }
    }
}
