import { IHash } from '../../../adapters/IHash';
import { IUserRepository } from '../../../adapters/Repositories/Iuser-repository';
import { UserUniquenessService } from '../../../application/Services/user-unique-services';
import { UserResponseDTO, UserUpdateDTO } from '../../Entities/user-entity';
import { ErrorConflitct } from '../../Error/error-conflict';
import { ErrorBadRequest } from '../../Error/error-bad-request';
import { LocalImageStorage } from '../../../infra/Image/Local-image-storage';

export class UserUpdateUseCase {
    constructor(
        private userRepo: IUserRepository,
        private hash: IHash,
        private verifyUnique: UserUniquenessService,
    ) {}

    async execute(data: UserUpdateDTO): Promise<UserResponseDTO> {
        const { profile_image_url } = data;
        if (data.email || data.username) {
            const details = await this.verifyUnique.verify(data.email, data.username, data.userId);
            if (details) throw new ErrorConflitct(details);
        }
        const user = await this.userRepo.findById(data.userId);
        if (!user) throw new ErrorBadRequest('Usuário não cadastrado');

        if (profile_image_url && user?.profile_image_url) LocalImageStorage.deleteByUrl(user.profile_image_url);
        if (profile_image_url) data.profile_image_url = `${process.env.BASE_URL}/perfil-image/${profile_image_url}`;
        if (data.password) data.password = await this.hash.hashPassword(data.password);

        return await this.userRepo.update(data, data.userId);
    }
}
