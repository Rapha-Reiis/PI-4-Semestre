import { IUserGameRepository } from '../../../adapters/Repositories/IUserGameRepistory';
import { ProfileUpdateDTO } from '../../Entities/Profile';

export class ProfileUpdateUseCase {
    constructor(private repository: IUserGameRepository) {}

    async execute(data: ProfileUpdateDTO) {
        return await this.repository.UpdateDataProfile(data);
    }
}
