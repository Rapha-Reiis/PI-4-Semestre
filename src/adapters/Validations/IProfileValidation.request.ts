import { ProfileCreateDTO } from '../../core/Entities/Profile';

export interface IProfileValidation {
    create(data: ProfileCreateDTO): any;
    verifyEnum(status: string): void;
}
