import { IHash } from '../../../adapters/IHash';
import { IUserRepository } from '../../../adapters/Repositories/IUserRepository';
import { UserUniquenessService } from '../../../application/Services/UserUniquesService';
import { UserResponseDTO, UserUpdateDTO } from '../../Entities/UserEntity';
import { ErrorConflitct } from '../../Error/ErrorConflict';

export class UserUpdateUseCase {
    constructor(
        private userRepo: IUserRepository,
        private hash: IHash,
        private verifyUnique: UserUniquenessService,
    ) {}

    async execute(id: string, data: UserUpdateDTO): Promise<UserResponseDTO> {
        if (data.email || data.username) {
            const details = await this.verifyUnique.verify(data.email, data.username, id);
            if (details) throw new ErrorConflitct(details);
        }

        if (data.password) data.password = await this.hash.hashPassword(data.password);

        return await this.userRepo.update(data, id);
    }
}
