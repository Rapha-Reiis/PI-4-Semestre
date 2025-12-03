import { User } from "core/entity/user/User.entity";

export interface IUserRepository {
  create(User: User): Promise<User>;
  listUsers(): Promise<User[]>;
}
