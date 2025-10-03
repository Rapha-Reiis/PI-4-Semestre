import { IProfileRepository } from '../../../adapters/Repositories/IProfileRepository';

export class ProfileGetByIdUseCase {
    constructor(private repository: IProfileRepository) {}

    async execute(userRawg: string) {
        const games = await this.repository.getUserProfile(userRawg);
        return games;
    }
}
