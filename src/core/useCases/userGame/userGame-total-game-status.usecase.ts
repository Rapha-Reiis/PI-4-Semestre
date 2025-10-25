import { IUserGameRepository } from '../../../adapters/Repositories/IuserGame-repository';

export class UserGameTotalGameStatus {
    constructor(private repository: IUserGameRepository) {}

    async execute(gameId: number) {
        return await this.repository.totalGameStatus(gameId);
    }
}
