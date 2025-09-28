import { IGameRepository } from '../../../adapters/Repositories/IGamesRepository';

export class GenresUseCase {
    constructor(private repository: IGameRepository) {}

    async execute() {
        return this.repository.getListGen();
    }
}
