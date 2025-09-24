import { IHash } from '../../../adapters/IHash';
import { IUserRepository } from '../../../adapters/Repositories/IUserRepository';
import { UserCreateDTO } from '../../Entities/UserEntity';

export class CreateUserUseCase {
    constructor(
        private repository: IUserRepository,
        private hash: IHash,
    ) {}

    async execute(data: UserCreateDTO) {
        data.password = await this.hash.hashPassword(data.password);

        return await this.repository.create(data);
    }
}
