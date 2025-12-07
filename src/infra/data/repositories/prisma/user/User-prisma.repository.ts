import { User } from "@core/entity/user/User.entity";
import { IUserRepository } from "@core/repositories/IUser.repository";
import { UserCreateOutputDto } from "@core/usecases/user/User-create.usecase";
import { PrismaClient } from "@prisma/client";

export class UserPrismaRepository implements IUserRepository {
  constructor(private db: PrismaClient) {}

  async create(user: User): Promise<UserCreateOutputDto> {
    const data = {
      name: user.name,
      email: user.email,
      password_hash: user.password,
      username: user.username,
    };

    try {
      return await this.db.users.create({
        data,
        select: { id: true },
      });
    } catch (error: any) {
      throw new Error("Erro ao cadastrar usuário no banco");
    }
  }

  listUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
