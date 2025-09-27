import { IHash } from '../../../adapters/IHash';
import { IUserRepository } from '../../../adapters/Repositories/IUserRepository';
import { UserUniquenessService } from '../../../application/Services/UserUniquesService';
import { UserResponseDTO, UserUpdateDTO } from '../../Entities/UserEntity';
import { ErrorConflitct } from '../../Error/ErrorConflict';
import { ErrorBadRequest } from '../../Error/ErrorBadRequest';
import { IImageStorage } from '../../../adapters/IImageStorage';

export class UserUpdateUseCase {
    constructor(
        private userRepo: IUserRepository,
        private hash: IHash,
        private verifyUnique: UserUniquenessService,
        private ImageStorage: IImageStorage,
    ) {}

    async execute(id: string, data: UserUpdateDTO, filename?: string): Promise<UserResponseDTO> {
        if (data.email || data.username) {
            const details = await this.verifyUnique.verify(data.email, data.username, id);
            if (details) throw new ErrorConflitct(details);
        }

        const user = await this.userRepo.findById(id);
        if (!user) throw new ErrorBadRequest('Usuário não cadastrado');

        if (filename && user?.profile_image_url) this.ImageStorage.deleteByUrl(user.profile_image_url);

        if (filename) data.profile_image_url = `${process.env.BASE_URL}/perfil-image/${filename}`;

        if (data.password) data.password = await this.hash.hashPassword(data.password);

        return await this.userRepo.update(data, id);
    }
}
