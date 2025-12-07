import { IUserRepository } from "@core/repositories/IUser.repository";
import { IUsecase } from "../Usecase";
import { VerifyUserExistById } from "services/VerifyUserExist";

export type DeleteUserInput = {
  userId: string;
};

export type DeleteUserOutput = void;

export class UserDeleteUsecase
  implements IUsecase<DeleteUserInput, DeleteUserOutput>
{
  constructor(
    private userRepo: IUserRepository,
    private VerifyUserExist: VerifyUserExistById
  ) {}

  async execute(input: DeleteUserInput): Promise<DeleteUserOutput> {
    const { userId } = input;

    await this.VerifyUserExist.execute({ userId });

    return await this.userRepo.delete({ userId });
  }
}
