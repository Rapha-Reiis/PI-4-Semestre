import { Request, Response } from 'express';
import { ErrorBadRequest } from '../core/Error/ErrorBadRequest';
import { ProfileGetByIdUseCase } from '../core/useCases/Profile/ProfileGetByIdUseCase';
import { ProfileCreateUseCase } from '../core/useCases/Profile/ProfileCreateUseCase';
import { ProfileCreateDTO } from '../core/Entities/Profile';

export class ProfileController {
    constructor(
        private getUserProfile: ProfileGetByIdUseCase,
        private createProfileUC: ProfileCreateUseCase,
    ) {}

    userProfile = async (req: Request, res: Response) => {
        const { userId } = req.params;
        if (!userId) throw new ErrorBadRequest('Não foi passado o ID do usuário');

        const userProfile = await this.getUserProfile.execute(userId);
        return res.status(200).json(userProfile);
    };

    createProfile = async (req: Request, res: Response) => {
        if (!req.body) throw new ErrorBadRequest('Não foi passado o body corretamente');
        const { userId, rawgId, status } = req.body;

        const profileCreate: ProfileCreateDTO = {
            rawgId: rawgId,
            status: status,
            userId: userId,
        };
        console.log(profileCreate);
        const profile = await this.createProfileUC.exeute(profileCreate);

        return res.status(201).json(profile);
    };
}
