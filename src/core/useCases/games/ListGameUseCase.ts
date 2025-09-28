import { IGameRepository } from '../../../adapters/Repositories/IGamesRepository';

export class ListGameUseCase {
    constructor(private gameRepo: IGameRepository) {}

    async execute(page: number, pageSize: number, search?: string) {
        const games = await this.gameRepo.gameList(page, pageSize, search);
        console.log('dps de retornar', games);
        return games;
    }
}
