import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from '../../core/Entities/UserEntity';

export interface IUserRepository {
    create(data: UserCreateDTO): Promise<UserResponseDTO>;
    update(data: UserUpdateDTO, id: string): Promise<UserResponseDTO>;
    findByEmail(email: string): Promise<UserResponseDTO | null>;
    findByUsername(username: string): Promise<UserResponseDTO | null>;
    findById(id: string): Promise<UserResponseDTO | null>;
}
