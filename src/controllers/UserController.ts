import { Request, Response } from 'express';
import { UserUpdateUseCase } from '../core/useCases/user/UserUpdate.useCase';
import { UserFindByEmailUseCase } from '../core/useCases/user/UserFindByEmail.useCase';
import { UserCreateUseCase } from '../core/useCases/user/UserCreate.useCase';
import { UserFindByUsernameUseCase } from '../core/useCases/user/UserFindByUsername.useCase';
import { ErrorBadRequest } from '../core/Error/ErrorBadRequest';
import { UserFindByIdUseCase } from '../core/useCases/user/UserFindById.useCase';

export class UserController {
    constructor(
        private readonly createUser: UserCreateUseCase,
        private readonly updateUser: UserUpdateUseCase,
        private readonly UserfindById: UserFindByIdUseCase,
        private readonly UserfindByEmail: UserFindByEmailUseCase,
        private readonly UserfindByUsername: UserFindByUsernameUseCase,
    ) {}

    async create(req: Request, res: Response) {
        const data = req.body;
        const user = await this.createUser.execute(data);
        return res.status(201).json(user);
    }

    async update(req: Request, res: Response) {
        const data = req.body;
        const { id } = req.params;
        if (!id) throw new ErrorBadRequest('Id não foi passado corretamente');
        const user = await this.updateUser.execute(id, data);
        return res.status(200).json(user);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) throw new ErrorBadRequest('Id não foi passado corretamente');
        const user = await this.UserfindById.execute(id);
        return res.status(200).json(user);
    }

    async findByEmail(req: Request, res: Response) {
        const { email } = req.params;
        if (!email) throw new ErrorBadRequest('Id não foi passado corretamente');
        const user = await this.UserfindByEmail.execute(email);
        return res.status(200).json(user);
    }
}
