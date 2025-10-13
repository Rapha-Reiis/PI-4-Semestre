import { IUserGameRepository } from '../../../adapters/Repositories/IUserGameRepistory';
import { ProfileUpdateDTO } from '../../Entities/Profile';

export class UserGameUpdateUsecase {
    constructor(private repository: IUserGameRepository) {}

    async execute(data: ProfileUpdateDTO) {
        return await this.repository.UpdateDataProfile(data);
    }
}
