import { RoleUser, User } from "core/entity/user/User.entity";
import { IUsecase } from "../Usecase";
import { IUserRepository } from "core/repositories/IUser.repository";

export type UserCreateInputDto = {
  name: string;
  username: string;
  email: string;
  password: string;
  profile_image_url?: string | null;
  bio?: string | null;
  role?: RoleUser;
  premium?: boolean;
};

export type UserCreateOutputDto = {
  id: string;
};

export class UserCreateUsecase
  implements IUsecase<UserCreateInputDto, UserCreateOutputDto>
{
  constructor(private userRepo: IUserRepository) {}

  async execute(input: UserCreateInputDto): Promise<UserCreateOutputDto> {
    const user = this.buildUser(input);

    const userCreate = await this.userRepo.create(user);

    const output = this.buildOutput(userCreate);

    return output;
  }

  buildUser(input: UserCreateInputDto): User {
    const user: User = {
      name: input.name,
      username: input.username,
      email: input.email,
      password: input.password,
      role: input.role ?? "USER",
      premium: input.premium ?? false,
      email_verified: false,
    };

    return user;
  }

  buildOutput(userInput: User): UserCreateOutputDto {
    const user: UserCreateOutputDto = {
      id: userInput.id!,
    };

    return user;
  }
}
