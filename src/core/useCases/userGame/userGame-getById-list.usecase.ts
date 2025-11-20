import { GameStatus } from '@prisma/client';
import { IUserGameRepository } from '../../../adapters/Repositories/IuserGame-repository';
import { VerifyUserService } from '../../../application/Services/user/verify-user.service';

export class UserGameGetByIdListUseCase {
    constructor(
        private repository: IUserGameRepository,
        private userVery: VerifyUserService,
    ) {}

    async execute(userId: string, page: number, limit: number, status?: GameStatus, search?: string) {
        this.userVery.VerifyId(userId);
        const games = await this.repository.getUserProfile(userId, page, limit, status, search);
        return games;
    }
}
