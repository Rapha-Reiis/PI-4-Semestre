import { IHash } from '../../../adapters/IHash';
import { IUserRepository } from '../../../adapters/Repositories/IUserRepository';
import { UserUniquenessService } from '../../../application/Services/UserUniquesService';
import { UserCreateDTO } from '../../Entities/UserEntity';
import { ErrorConflitct } from '../../Error/ErrorConflict';

export class UserCreateUseCase {
    constructor(
        private repository: IUserRepository,
        private hash: IHash,
        private verifyUnique: UserUniquenessService,
    ) {}

    async execute(data: UserCreateDTO) {
        const details = await this.verifyUnique.verify(data.email, data.username);
        console.log('details');
        if (details) {
            throw new ErrorConflitct(details);
        }

        data.password = await this.hash.hashPassword(data.password);

        return await this.repository.create(data);
    }
}
