import { ProfileCreateDTO } from '../../core/Entities/Profile';

export interface IProfileRepository {
    getUserProfile(rawgId: string): Promise<any>;
    createUserProfile(data: ProfileCreateDTO): Promise<any>;
}
