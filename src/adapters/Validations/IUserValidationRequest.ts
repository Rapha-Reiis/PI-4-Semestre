import { UserCreateDTO, UserUpdateDTO } from '../../core/Entities/UserEntity';

export interface IUserValidationRequest {
    Create(data: UserCreateDTO): any;
    Email(email: string): any;
    Update(data: UserUpdateDTO): any;
}
