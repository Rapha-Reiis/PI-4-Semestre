import { GameStatus } from '@prisma/client';
import { IUserGameRepository } from '../../../adapters/Repositories/IuserGame-repository';

export class UserGameGetByIdListUseCase {
    constructor(private repository: IUserGameRepository) {}

    async execute(userRawg: string, page: number, limit: number, status: GameStatus | undefined) {
        const games = await this.repository.getUserProfile(userRawg, page, limit, status);
        return games;
    }
}
