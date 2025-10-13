import { IHash } from '../../../adapters/IHash';
import { IUserRepository } from '../../../adapters/Repositories/Iuser-repository';
import { UserUniquenessService } from '../../../application/Services/user-unique-services';
import { UserCreateDTO } from '../../Entities/user-entity';
import { ErrorConflitct } from '../../Error/error-conflict';
import 'dotenv/config';

export class UserCreateUseCase {
    constructor(
        private repository: IUserRepository,
        private hash: IHash,
        private verifyUnique: UserUniquenessService,
    ) {}

    async execute(data: UserCreateDTO) {
        console.log('cheguei2');
        const details = await this.verifyUnique.verify(data.email, data.username);
        if (details) {
            throw new ErrorConflitct(details);
        }

        data.password = await this.hash.hashPassword(data.password);

        if (data.profile_image_url) {
            data.profile_image_url = `${process.env.BASE_URL}/perfil-image/${data.profile_image_url}`;
        }
        return await this.repository.create(data);
    }
}
