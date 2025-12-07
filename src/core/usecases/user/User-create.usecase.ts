import { User } from "core/entity/user/User.entity";
import { IUsecase } from "../Usecase";
import { IUserRepository } from "core/repositories/IUser.repository";

export type UserCreateInputDto = {
  name: string;
  username: string;
  email: string;
  password_hash: string;
  avatar_url?: string | null;
  bio?: string | null;
  role?: string;
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

    return await this.userRepo.create(user);
  }

  buildUser(input: UserCreateInputDto): User {
    const user: User = {
      name: input.name,
      username: input.username,
      email: input.email,
      password_hash: input.password_hash,
      role: input.role ?? "USER",
      premium: input.premium ?? false,
      email_verified: false,
    };

    return user;
  }
}
