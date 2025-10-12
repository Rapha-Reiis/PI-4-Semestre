import { Request, Response } from 'express';
import { ErrorBadRequest } from '../core/Error/ErrorBadRequest';
import { ProfileGetByIdUseCase } from '../core/useCases/Profile/ProfileGetByIdUseCase';
import { ProfileCreateUseCase } from '../core/useCases/Profile/ProfileCreateUseCase';
import { ProfileUpdateDTO } from '../core/Entities/Profile';
import { ProfileUpdateUseCase } from '../core/useCases/Profile/ProfileUpdateUseCase';
import { GameStatus } from '@prisma/client';
import { IProfileValidation } from '../adapters/Validations/IProfileValidation.request';
import { profileCreateSchema } from '../infra/Validations/ZodValidations/Profile/pofile-schema';

export class ProfileController {
    constructor(
        private getUserProfileById: ProfileGetByIdUseCase,
        private createProfileUC: ProfileCreateUseCase,
        private updateProfileUC: ProfileUpdateUseCase,
        private validation: IProfileValidation,
    ) {}

    /* Para deixar padrão no controller vamos fazer assim:
        Passo 1 validação é feita no controller para melhor abosrção para não lotar o routes de classes :p.
        Passo 2 passo 2 criar o adapter da validação e instanciar no meke***** (econtrado em factores)
        passo 3 no método que vai para o caso de uso passar o req.body completo(obviamente dps de passar pelas validações)
        passo 4 no argumento em use case deixar o DTO como requerimento.
        passo 5 use o createProfile como exemplo.
        pq disso? 
        Simples... Eu to cagando no código todo colocando, middler onde não devia, etc.. assim vai ficar mais clean e bonitin XD 
        #vivendoeaprendendo
        #desculpetomelhorando
        #sotofazendocagada
        PS: raphael do futuro, lembre de ver essa anotação nos próximos controllers amigo.
    */

    userProfile = async (req: Request, res: Response) => {
        let { id, page, limit } = req.query;
        // validação
        const status = (req.body.status as string | null) ?? null;
        if (!id) throw new ErrorBadRequest('Não foi passado o ID do usuário');
        const pageN = Number(page);
        const limitN = Number(limit);
        let newStatus;
        if (status) {
            let newStatus = this.validation.verifyEnum(status);
            console.log(newStatus);
        }
        //
        const userProfile = await this.getUserProfileById.execute(id.toString(), pageN, limitN, newStatus);
        return res.status(200).json(userProfile);
    };

    createProfile = async (req: Request, res: Response) => {
        if (!req.body) throw new ErrorBadRequest('Não foi passado o body corretamente');
        this.validation.create(req.body);

        const profile = await this.createProfileUC.exeute(req.body);

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
