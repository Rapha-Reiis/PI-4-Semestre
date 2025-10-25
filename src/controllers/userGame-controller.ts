import { Request, Response } from 'express';
import { ErrorBadRequest } from '../core/Error/error-bad-request';
import { ProfileCreateDTO, ProfileUpdateDTO } from '../core/Entities/userGame-entity';
import { GameStatus } from '@prisma/client';
import { UserGameGetByIdListUseCase } from '../core/useCases/userGame/userGame-getById-list.usecase';
import { UserGameCreateUsecase } from '../core/useCases/userGame/userGame-create.usecase';
import { UserGameUpdateUsecase } from '../core/useCases/userGame/userGame-update.usecase';
import { UserGameTotalGameStatus } from '../core/useCases/userGame/userGame-total-game-status.usecase';

export class UserGameController {
    constructor(
        private getUserProfileById: UserGameGetByIdListUseCase,
        private createProfileUC: UserGameCreateUsecase,
        private updateProfileUC: UserGameUpdateUsecase,
        private totalGameStatusUC: UserGameTotalGameStatus,
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

    totalGameStatus = async (req: Request<{}, {}, {}, { gameId: number }>, res: Response) => {
        if (!req.query.gameId) throw new ErrorBadRequest('gameId não foi passado');

        const out = await this.totalGameStatusUC.execute(req.query.gameId);

        res.status(200).json(out);
    };
}
