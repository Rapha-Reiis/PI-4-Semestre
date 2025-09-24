import { IUserRepository } from '../../../adapters/Repositories/IUserRepository';
import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from '../../../core/Entities/UserEntity';
import { ErrorApp } from '../../../core/Error/ErrorApp';
import app from '../../../main/app';
import { prisma } from '../client';

export class UserRepositoryImpl implements IUserRepository {
    private prisma = prisma;
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
            throw new ErrorApp('Erro no banco', 500);
        }
    }

    async update(data: UserUpdateDTO, id: string): Promise<UserResponseDTO> {
        try {
            return await this.prisma.user.update({
                where: { id },
                data: data,
                select: this.select,
            });
        } catch {
            throw new ErrorApp('Erro com o bacno', 500);
        }
    }

    async findByEmail(email: string): Promise<UserResponseDTO | null> {
        try {
            return await this.prisma.user.findUnique({
                where: { email },
                select: this.select,
            });
        } catch (err) {
            throw new ErrorApp('Erro no banco', 500);
        }
    }

    async findById(id: string): Promise<UserResponseDTO | null> {
        try {
            return await this.prisma.user.findUnique({
                where: { id },
                select: this.select,
            });
        } catch (err) {
            throw new ErrorApp('Erro no bacno', 500);
        }
    }

    async findByUsername(username: string): Promise<UserResponseDTO | null> {
        try {
            return await this.prisma.user.findUnique({
                where: { username },
                select: this.select,
            });
        } catch (err) {
            throw new ErrorApp('Erro no banco', 500);
        }
    }
}
