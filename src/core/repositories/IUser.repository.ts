import { getUserByIdOutput } from "@core/usecases/user/Get-user-by-id.usecase";
import { searchOutputDto } from "@core/usecases/user/Search-users.usecase";
import { UserCreateOutputDto } from "@core/usecases/user/User-create.usecase";
import { User } from "core/entity/user/User.entity";

export interface IUserRepository {
  create(User: User): Promise<UserCreateOutputDto>;
  searchUsers(username: string): Promise<searchOutputDto>;
  getUserById(userId: string): Promise<getUserByIdOutput >
}
