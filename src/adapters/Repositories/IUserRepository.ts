import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from '../../core/Entities/UserEntity';

export interface IUserRepository {
    create(data: UserCreateDTO): Promise<UserResponseDTO>;
    update(data: UserUpdateDTO): Promise<UserResponseDTO>;
    findByEmail(email: string): Promise<UserResponseDTO>;
    findById(id: string): Promise<UserResponseDTO>;
}
