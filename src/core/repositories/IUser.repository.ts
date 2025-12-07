import { UserCreateOutputDto } from "@core/usecases/user/User-create.usecase";
import { User } from "core/entity/user/User.entity";

export interface IUserRepository {
  create(User: User): Promise<UserCreateOutputDto>;
  listUsers(): Promise<User[]>;
}
