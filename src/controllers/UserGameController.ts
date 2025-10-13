import { Request, Response } from 'express';
import { ErrorBadRequest } from '../core/Error/ErrorBadRequest';
import { ProfileGetByIdUseCase } from '../core/useCases/Profile/ProfileGetByIdUseCase';
import { ProfileCreateUseCase } from '../core/useCases/Profile/ProfileCreateUseCase';
import { ProfileCreateDTO, ProfileUpdateDTO } from '../core/Entities/Profile';
import { ProfileUpdateUseCase } from '../core/useCases/Profile/ProfileUpdateUseCase';
import { GameStatus } from '@prisma/client';

export class UserGameController {
    constructor(
        private getUserProfileById: ProfileGetByIdUseCase,
        private createProfileUC: ProfileCreateUseCase,
        private updateProfileUC: ProfileUpdateUseCase,
    ) {}

    getProfileList = async (req: Request, res: Response) => {
        let { id, page, limit, status } = req.query;
        if (!id) throw new ErrorBadRequest('Não foi passado o ID do usuário');

        const pageN = Number(page);
        const limitN = Number(limit);

        let gameStatus: GameStatus | undefined;
        if (status && Object.values(GameStatus).includes(status.toString().toUpperCase() as GameStatus)) {
            gameStatus = status.toString().toUpperCase() as GameStatus;
        }
        const userProfile = await this.getUserProfileById.execute(id.toString(), pageN, limitN, gameStatus);
        return res.status(200).json(userProfile);
    };

    createProfile = async (req: Request, res: Response) => {
        if (!req.body) throw new ErrorBadRequest('Não foi passado o body corretamente');
        const { userId, gameId, status, note } = req.body;

        const profileCreate: ProfileCreateDTO = {
            gameId: gameId,
            userId: userId,
            status: status,
            note: note,
        };
        console.log(profileCreate);
        const profile = await this.createProfileUC.exeute(profileCreate);

        return res.status(201).json(profile);
    };

    updateProfiel = async (req: Request, res: Response) => {
        if (!req.body) throw new ErrorBadRequest('Body veio vázio');
        if (!req.params) throw new ErrorBadRequest('Parâmetro do ID não foi passado corretamente');
        const { status, note } = req.body;
        const { id } = req.params;

        const data = {
            id: id,
            status,
            note,
        } as ProfileUpdateDTO;

        const updateProfile = await this.updateProfileUC.execute(data);

        return res.status(200).json({
            message: 'Atualizado com sucesso!',
            ...updateProfile,
        });
    };
}
