import { IUserRepository } from '../../adapters/Repositories/IUserRepository';

export class UserUniquenessService {
    constructor(private readonly userRepo: IUserRepository) {}

    async verify(email: string, username: string, UserId?: string) {
        const details: { field: string; message: string }[] = [];

        const existingEmail = await this.userRepo.findByEmail(email);
        if (UserId) {
            if (existingEmail && existingEmail.id !== UserId) details.push({ field: 'email', message: 'E-mail já cadastrado' });
        } else {
            if (existingEmail) details.push({ field: 'email', message: 'E-mail já cadastrado' });
        }

        const existingUser = await this.userRepo.findByUsername(username);
        console.log(existingUser);
        if (UserId) {
            if (existingUser && existingUser.id !== UserId) details.push({ field: 'username', message: 'Username já cadastrado' });
        } else {
            if (existingUser) details.push({ field: 'username', message: 'Username já cadastrado' });
        }

        return details.length > 0 ? details : null;
    }
}
