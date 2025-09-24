import { IUserRepository } from '../../../adapters/Repositories/IUserRepository';
import { UserCreateDTO } from '../../Entities/UserEntity';

export class CreateUserUseCase {
    constructor(private repository: IUserRepository) {}

    async execute(data: UserCreateDTO) {
        return await this.repository.create(data);
    }
}
