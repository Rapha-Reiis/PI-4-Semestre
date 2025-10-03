import { Request, Response } from 'express';
import { ErrorBadRequest } from '../core/Error/ErrorBadRequest';
import { ProfileGetByIdUseCase } from '../core/useCases/Profile/ProfileGetByIdUseCase';
import { ProfileCreateUseCase } from '../core/useCases/Profile/ProfileCreateUseCase';
import { ProfileCreateDTO, ProfileUpdateDTO } from '../core/Entities/Profile';
import { ProfileUpdateUseCase } from '../core/useCases/Profile/ProfileUpdateUseCase';
import no from 'zod/v4/locales/no.js';

export class ProfileController {
    constructor(
        private getUserProfile: ProfileGetByIdUseCase,
        private createProfileUC: ProfileCreateUseCase,
        private updateProfileUC: ProfileUpdateUseCase,
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

    updateProfiel = async (req: Request, res: Response) => {
        if (!req.body) throw new ErrorBadRequest('Body veio vázio');
        if (!req.params) throw new ErrorBadRequest('Parâmetro do ID não foi passado corretamente');
        const { status, rating, note, review } = req.body;
        const { id } = req.params;
        console.log(id);

        const data = {
            id: id,
            status,
            rating,
            note,
            review,
        } as ProfileUpdateDTO;

        const updateProfile = await this.updateProfileUC.execute(data);

        return res.status(200).json({
            message: 'Atualizado com sucesso!',
            ...updateProfile,
        });
    };
}
