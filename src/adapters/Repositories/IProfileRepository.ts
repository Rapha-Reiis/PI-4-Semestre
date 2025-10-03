import { ProfileCreateDTO, ProfileUpdateDTO } from '../../core/Entities/Profile';

export interface IProfileRepository {
    getUserProfile(rawgId: string): Promise<any>;
    createUserProfile(data: ProfileCreateDTO): Promise<any>;
    UpdateDataProfile(data: ProfileUpdateDTO): Promise<any>;
}
