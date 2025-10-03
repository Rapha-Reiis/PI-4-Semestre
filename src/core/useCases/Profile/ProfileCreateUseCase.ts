import { IProfileRepository } from '../../../adapters/Repositories/IProfileRepository';
import { ProfileCreateDTO } from '../../Entities/Profile';

export class ProfileCreateUseCase {
    constructor(private repository: IProfileRepository) {}

    async exeute(data: ProfileCreateDTO) {
        return await this.repository.createUserProfile(data);
    }
}
