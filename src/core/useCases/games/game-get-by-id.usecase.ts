import { IGameRepository } from '../../../adapters/Repositories/Igame-repository';

export class GameGetByIdUseCase {
    constructor(private repository: IGameRepository) {}

    async execute(rawgId: string) {
        return this.repository.getById(rawgId);
    }
}
