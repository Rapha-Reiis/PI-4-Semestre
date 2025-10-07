import { IProfileRepository } from '../../../adapters/Repositories/IProfileRepository';
import { ProfileCreateDTO } from '../../Entities/Profile';
import { ErrorConflitct } from '../../Error/ErrorConflict';

export class ProfileCreateUseCase {
    constructor(private repository: IProfileRepository) {}

    async exeute(data: ProfileCreateDTO) {
        const { gameId, userId } = data;
        const exist = await this.repository.VerifyGameWithUser(userId, gameId);
        if (exist) throw new ErrorConflitct('O jogo já cadastrado nesse perfil');
        const profileCreate = await this.repository.createUserProfile(data);

        return profileCreate;
    }
}
