import { Request, Response } from 'express';
import { UserUpdateUseCase } from '../core/useCases/user/UserUpdate.useCase';
import { UserFindByEmailUseCase } from '../core/useCases/user/UserFindByEmail.useCase';
import { UserCreateUseCase } from '../core/useCases/user/UserCreate.useCase';
import { UserFindByUsernameUseCase } from '../core/useCases/user/UserFindByUsername.useCase';
import { ErrorBadRequest } from '../core/Error/ErrorBadRequest';
import { UserFindByIdUseCase } from '../core/useCases/user/UserFindById.useCase';
import { UserCreateDTO } from '../core/Entities/UserEntity';

export class UserController {
    constructor(
        private readonly createUser: UserCreateUseCase,
        private readonly updateUser: UserUpdateUseCase,
        private readonly UserfindById: UserFindByIdUseCase,
        private readonly UserfindByEmail: UserFindByEmailUseCase,
        private readonly UserfindByUsername: UserFindByUsernameUseCase,
    ) {}

    create = async (req: Request, res: Response) => {
        const filename = req.file?.filename;
        const profile_image = filename ?? null;
        const data: UserCreateDTO = req.body;
        data.profile_image_url = profile_image;
        console.log('cheguei1');
        const user = await this.createUser.execute(data);
        return res.status(201).json(user);
    };

    update = async (req: Request, res: Response) => {
        const data = req.body;
        const filename = req.file?.filename;
        const { id } = req.params;
        if (!id) throw new ErrorBadRequest('Id não foi passado corretamente');
        const user = await this.updateUser.execute(id, data, filename);
        return res.status(200).json(user);
    };

    findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) throw new ErrorBadRequest('Id não foi passado corretamente');
        const user = await this.UserfindById.execute(id);
        return res.status(200).json(user);
    };

    findByEmail = async (req: Request, res: Response) => {
        const { email } = req.params;
        if (!email) throw new ErrorBadRequest('Id não foi passado corretamente');
        const user = await this.UserfindByEmail.execute(email);
        return res.status(200).json(user);
    };

    findByUsername = async (req: Request, res: Response) => {
        const { username } = req.params;
        if (!username) throw new ErrorBadRequest('Username não foi passado corretamente');
        const user = await this.UserfindByUsername.execute(username);
        return res.status(200).json(user);
    };
}
