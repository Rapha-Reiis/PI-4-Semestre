import { IGameRepository } from '../../../adapters/Repositories/IGamesRepository';

export class GameGetGenresUseCase {
    constructor(private repository: IGameRepository) {}
    async execute() {
        return this.repository.getListGen();
    }
}
