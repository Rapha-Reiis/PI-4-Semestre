import { IProfileRepository } from '../../../adapters/Repositories/IProfileRepository';
import { ProfileUpdateDTO } from '../../Entities/Profile';

export class ProfileUpdateUseCase {
    constructor(private repository: IProfileRepository) {}

    async execute(data: ProfileUpdateDTO) {
        return await this.repository.UpdateDataProfile(data);
    }
}
