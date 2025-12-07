import { User } from "@core/entity/user/User.entity";
import { IUserRepository } from "@core/repositories/IUser.repository";
import { IUsecase } from "../Usecase";

export type getUserByIdInput = {
  userId: string;
};

export type getUserByIdOutput = User | null;

export class GetUserByIdUsecase
  implements IUsecase<getUserByIdInput, getUserByIdOutput>
{
  constructor(private userRepo: IUserRepository) {}

  async execute(input: getUserByIdInput): Promise<getUserByIdOutput> {
    const user = await this.userRepo.getUserById(input.userId);
    if(!user){
      throw new Error("Usuário não cadastrado")
    }
    return user;
  }
}
