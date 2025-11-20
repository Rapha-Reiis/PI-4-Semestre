import { IHash } from '../../../adapters/IHash';
import { IUserRepository } from '../../../adapters/Repositories/Iuser-repository';
import { SendEmailService } from '../../../application/Services/email/sendEmailService';
import { VerifyUserService } from '../../../application/Services/user/verify-user.service';
import { UserCreateDTO } from '../../Entities/user-entity';
import 'dotenv/config';

export class UserCreateUseCase {
    constructor(
        private repository: IUserRepository,
        private hash: IHash,
        private VerfyUser: VerifyUserService,
        private sendEmail: SendEmailService,
    ) {}

    async execute(data: UserCreateDTO) {
        await this.VerfyUser.VerifyUnique(data.email, data.username);

        data.password = await this.hash.hashPassword(data.password);

        if (data.profile_image_url) {
            data.profile_image_url = `${process.env.BASE_URL}/perfil-image/${data.profile_image_url}`;
        }
        const newUser = await this.repository.create(data);

        await this.sendEmail.sendWelcomeEmail(data.email, data.name);

        return {
            id: newUser.id,
        };
    }
}
