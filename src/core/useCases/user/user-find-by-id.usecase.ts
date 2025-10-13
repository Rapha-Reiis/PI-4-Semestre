import { IUserRepository } from '../../../adapters/Repositories/Iuser-repository';
import { UserResponseDTO } from '../../Entities/user-entity';
import { ErrorApp } from '../../Error/erro-app';

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
