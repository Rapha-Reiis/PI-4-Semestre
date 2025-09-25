import { IUserRepository } from '../../../adapters/Repositories/IUserRepository';
import { UserResponseDTO } from '../../Entities/UserEntity';
import { ErrorApp } from '../../Error/ErrorApp';

export class UserFindByUsernameUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute(username: string): Promise<UserResponseDTO> {
        const user = await this.userRepo.findByUsername(username);

        if (!user) {
            throw new ErrorApp('Usuário não encontrado', 404);
        }

        return user;
    }
}
