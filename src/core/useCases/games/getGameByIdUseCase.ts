import { IGameRepository } from '../../../adapters/Repositories/IGamesRepository';

export class getGameByIdUseCase {
    constructor(private repository: IGameRepository) {}

    async execute(rawgId: string) {
        return this.repository.getById(rawgId);
    }
}
