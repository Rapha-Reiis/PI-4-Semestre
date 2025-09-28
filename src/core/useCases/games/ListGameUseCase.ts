import { IGameRepository } from '../../../adapters/Repositories/IGamesRepository';

export class ListGameUseCase {
    constructor(private gameRepo: IGameRepository) {}

    async execute(page: string, pageSize: string, search?: string, genre?: string) {
        const games = await this.gameRepo.gameList(page, pageSize, search, genre);
        console.log('dps de retornar', games);
        return games;
    }
}
