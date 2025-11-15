import { IUserGameRepository } from '../../../adapters/Repositories/IuserGame-repository';
import { VerifyUserService } from '../../../application/Services/user/verify-user.service';
import { ProfileCreateDTO } from '../../Entities/userGame-entity';
import { ErrorBadRequest } from '../../Error/error-bad-request';
import { ErrorConflitct } from '../../Error/error-conflict';

export class UserGameCreateUsecase {
    constructor(
        private repository: IUserGameRepository,
        private verifyUser: VerifyUserService,
    ) {}

    async exeute(data: ProfileCreateDTO) {
        const { gameId, userId } = data;

        await this.verifyUser.VerifyId(userId);
        this.validate(data);
        const exist = await this.repository.VerifyGameWithUser(userId, gameId);
        if (exist) throw new ErrorConflitct('O jogo já cadastrado nesse perfil');
        const profileCreate = await this.repository.createUserProfile(data);

        return profileCreate;
    }

    validate(data: ProfileCreateDTO) {
        if (!['BACKLOG', 'PLAYING', 'FINISHED', 'DROPPED'].includes(data.status))
            throw new ErrorBadRequest('Parâmetro de status não é valido');
    }
}
