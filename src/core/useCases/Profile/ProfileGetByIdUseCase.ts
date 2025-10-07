import { GameStatus } from '@prisma/client';
import { IProfileRepository } from '../../../adapters/Repositories/IProfileRepository';

export class ProfileGetByIdUseCase {
    constructor(private repository: IProfileRepository) {}

    async execute(userRawg: string, page: number, limit: number, status: GameStatus | undefined) {
        const games = await this.repository.getUserProfile(userRawg, page, limit, status);
        return games;
    }
}
