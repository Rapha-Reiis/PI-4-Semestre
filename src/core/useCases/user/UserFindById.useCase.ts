import { IUserRepository } from '../../../adapters/Repositories/IUserRepository';
import { UserResponseDTO } from '../../Entities/UserEntity';
import { ErrorApp } from '../../Error/ErrorApp';

export class UserFindByIdUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute(id: string): Promise<UserResponseDTO> {
        const user = await this.userRepo.findById(id);

        if (!user) {
            throw new ErrorApp('Usuário não cadastrado', 404);
        }

        return user;
    }
}
