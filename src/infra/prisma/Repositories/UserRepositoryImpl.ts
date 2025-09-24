import { IUserRepository } from '../../../adapters/Repositories/IUserRepository';
import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from '../../../core/Entities/UserEntity';
import { prisma } from '../client';

export class UserRepositoryImpl implements IUserRepository {
    private prisma = prisma;

    async create(data: UserCreateDTO): Promise<UserResponseDTO> {
        try {
            return await this.prisma.user.create({
                data: data,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                    profile_image_url: true,
                    bio: true,
                    premium: true,
                    role: true,
                },
            });
        } catch (err) {
            throw new Error('Erro no com o banco: \n' + err);
        }
    }
    async update(data: UserUpdateDTO): Promise<UserResponseDTO> {
        throw new Error('Method not implemented.');
    }
    async findByEmail(email: string): Promise<UserResponseDTO> {
        throw new Error('Method not implemented.');
    }
    async findById(id: string): Promise<UserResponseDTO> {
        throw new Error('Method not implemented.');
    }
}
