import { IUserGameRepository } from '../../../adapters/Repositories/IuserGame-repository';
import { ProfileUpdateDTO } from '../../Entities/userGame-entity';

export class UserGameUpdateUsecase {
    constructor(private repository: IUserGameRepository) {}

    async execute(data: ProfileUpdateDTO) {
        return await this.repository.UpdateDataProfile(data);
    }
}
