import { IUserGameRepository } from '../../../adapters/Repositories/IuserGame-repository';

export class UserGameTotalGameStatus {
    constructor(private repository: IUserGameRepository) {}

    async execute(gameId?: number, userId?: string) {
        if (gameId) {
            return await this.repository.totalGameStatusGame(gameId);
        } else if (userId) {
            return await this.repository.totalGameStatusUser(userId);
        }
    }
}
