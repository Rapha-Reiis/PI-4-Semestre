import { IUserRepository } from '../../../adapters/Repositories/Iuser-repository';
import { UserUpdateDTO } from '../../../core/Entities/user-entity';
import { ErrorBadRequest } from '../../../core/Error/error-bad-request';

export class UpgradeUserToPremiumService {
    constructor(private userRepo: IUserRepository) {}

    async execute(userId: string) {
        const user = await this.userRepo.findById(userId);
        if (!user) throw new ErrorBadRequest('Usuário não cadastrado');

        const update: UserUpdateDTO = {
            userId: user.id,
            premium: true,
            plan_expires_at: this.add30Days(),
        };

        await this.userRepo.update(update, user.id);
    }

    private add30Days() {
        const time = new Date();
        time.setDate(time.getDate() + 30);
        return time;
    }
}
