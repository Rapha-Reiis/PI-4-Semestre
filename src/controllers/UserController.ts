import { Request, Response } from 'express';
import { CreateUserUseCase } from '../core/useCases/user/createUser.useCase';

export class UserController {
    constructor(private readonly createUser: CreateUserUseCase) {}

    async create(req: Request, res: Response) {
        const data = req.body;
        const user = await this.createUser.execute(data);
        return res.status(201).json(user);
    }
}
