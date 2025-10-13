import { IUserGameRepository } from '../../../adapters/Repositories/IUserGameRepistory';
import { ProfileCreateDTO } from '../../Entities/Profile';
import { ErrorConflitct } from '../../Error/ErrorConflict';

export class UserGameCreateUsecase {
    constructor(private repository: IUserGameRepository) {}

    async exeute(data: ProfileCreateDTO) {
        const { gameId, userId } = data;
        const exist = await this.repository.VerifyGameWithUser(userId, gameId);
        if (exist) throw new ErrorConflitct('O jogo já cadastrado nesse perfil');
        const profileCreate = await this.repository.createUserProfile(data);

        return profileCreate;
    }
}
