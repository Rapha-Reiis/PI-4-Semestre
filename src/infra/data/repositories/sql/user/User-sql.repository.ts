import { User } from "core/entity/user/User.entity";
import { IUserRepository } from "core/repositories/IUser.repository";
import { PostgresDbConfig } from "infra/data/Config/Postgres/Postgres-db.config";
import { UserRow } from "./types/User-types";
import { UserCreateOutputDto } from "@core/usecases/user/User-create.usecase";
import { searchOutputDto } from "@core/usecases/user/Search-users.usecase";
import { getUserByIdOutput } from "@core/usecases/user/Get-user-by-id.usecase";
import {
  UpdateUserInputDto,
  UpdateUserOutputDto,
} from "@core/usecases/user/Update-users.usecase";

export class UserSqlRepository implements IUserRepository {
  constructor(private db: PostgresDbConfig) {}

  update(user: UpdateUserInputDto): Promise<UpdateUserOutputDto> {
    throw new Error("Method not implemented.");
  }

  getUserById(userId: string): Promise<getUserByIdOutput> {
    throw new Error("Method not implemented.");
  }

  async create(user: User): Promise<UserCreateOutputDto> {
    try {
      const rows = await this.db.query<UserRow>(
        `INSERT INTO users (name, email, username, password_hash, avatar_url, bio)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
          user.name,
          user.email,
          user.username,
          user.password_hash,
          user.avatar_url,
          user.bio,
        ]
      );

      const row = rows[0];

      const userOut: UserCreateOutputDto = {
        id: row.id!,
      };

      return userOut;
    } catch (err: any) {
      throw new Error("Erro ao criar usuário");
    }
  }

  searchUsers(username: string): Promise<searchOutputDto> {
    throw new Error("Method not implemented.");
  }
}
