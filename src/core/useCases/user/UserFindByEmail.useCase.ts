import { IUserRepository } from '../../../adapters/Repositories/IUserRepository';
import { UserResponseDTO } from '../../Entities/UserEntity';
import { ErrorApp } from '../../Error/ErrorApp';

export class UserFindByEmailUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute(email: string): Promise<UserResponseDTO> {
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            throw new ErrorApp('Usuário não encontrado', 404);
        }

        return user;
    }
}
