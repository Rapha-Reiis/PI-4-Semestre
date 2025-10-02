import { Request, Response } from 'express';
import { ErrorBadRequest } from '../core/Error/ErrorBadRequest';
import { getUserProfileUseCase } from '../core/useCases/userGames/getUserProfile';

export class UserProfileController {
    constructor(private getUserProfile: getUserProfileUseCase) {}

    userProfile = async (req: Request, res: Response) => {
        const { userId } = req.params;
        if (!userId) throw new ErrorBadRequest('Não foi passado o ID do usuário');

        const userProfile = await this.getUserProfile.execute(userId);
        return res.status(200).json(userProfile);
    };
}
