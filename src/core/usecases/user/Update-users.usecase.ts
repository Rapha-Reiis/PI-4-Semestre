import { IUserRepository } from "@core/repositories/IUser.repository";
import { IUsecase } from "../Usecase";
import { VerifyUserExistById } from "services/VerifyUserExist";

export type UpdateUserInputDto = {
  userId?: string;
  name?: string;
  username?: string;
  email?: string;
  password_hash?: string;
  avatar_url?: string | null;
  bio?: string | null;
  premium?: boolean;
};

export type UpdateUserOutputDto = UpdateUserInputDto;

export class UpdateUserUsecase
  implements IUsecase<UpdateUserInputDto, UpdateUserOutputDto>
{
  constructor(
    private userRepo: IUserRepository,
    private userExist: VerifyUserExistById
  ) {}

  async execute(input: UpdateUserInputDto): Promise<UpdateUserOutputDto> {
    const { userId } = input;
    const user = await this.userExist.execute({ userId: userId! });

    const newUser = await this.userRepo.update(input);

    return newUser;
  }
}
