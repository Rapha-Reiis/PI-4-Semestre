import { LoginEntity } from '../../core/Entities/LoginEntity';

export interface ILoginValidationReqeust {
    create(data: LoginEntity): any;
}
