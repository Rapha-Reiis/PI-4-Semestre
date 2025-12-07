import { User } from "@core/entity/user/User.entity";
import { IUserRepository } from "@core/repositories/IUser.repository";
import { getUserByIdOutput } from "@core/usecases/user/Get-user-by-id.usecase";
import { searchOutputDto } from "@core/usecases/user/Search-users.usecase";
import { UserCreateOutputDto } from "@core/usecases/user/User-create.usecase";
import { PrismaClient } from "@prisma/client";

export class UserPrismaRepository implements IUserRepository {
  constructor(private db: PrismaClient) {}

  async create(user: User): Promise<UserCreateOutputDto> {
    const data = {
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
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

  async searchUsers(username: string): Promise<searchOutputDto> {
    try {
      return await this.db.users.findMany({
        where: {
          username: {
            contains: username,
            mode: "insensitive",
          },
        },
        orderBy: {
          username: "asc",
        },
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
        },
        take: 5,
      });
    } catch (err: any) {
      throw new Error("ERRO");
    }
  }

  async getUserById(userId: string): Promise<getUserByIdOutput> {
    try{
      const findUser = await this.db.users.findFirst({
        where: {
          id: userId
        },
      })
            
      return findUser

    }catch(err:any){
      throw new Error("ERRO");
    }
  }

}  

