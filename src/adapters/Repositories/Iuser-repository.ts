import { UserCreateDTO, UserResponseDTO, UserResponseWhitPasswordDTO, UserUpdateDTO } from '../../core/Entities/user-entity';

export interface IUserRepository {
    create(data: UserCreateDTO): Promise<UserResponseDTO>;
    update(data: UserUpdateDTO, id: string): Promise<any>;
    findByEmail(email: string): Promise<UserResponseDTO | null>;
    findByUsername(username: string): Promise<UserResponseDTO | null>;
    findById(id: string): Promise<UserResponseDTO | null>;
    findByEmailWithPassword(email: string): Promise<UserResponseWhitPasswordDTO | null>;
}
