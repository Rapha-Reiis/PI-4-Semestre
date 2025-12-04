import { User } from "core/entity/user/User.entity";
import { IUserRepository } from "core/repositories/IUser.repository";
import { PostgresDbConfig } from "infra/data/Config/Postgres/Postgres-db.config";
import { UserRow } from "./types/User-types";

export class UserRepository implements IUserRepository {
  
  constructor(private db: PostgresDbConfig) {}

  async create(user: User): Promise<User> {
    try {
      const rows = await this.db.query<UserRow>(
        `INSERT INTO users (name, email, username, password_hash, avatar_url, bio, email_verified, premium, role)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        `,
        [
          user.name,
          user.email,
          user.username,
          user.password,
          user.avatar_url,
          user.bio,
          user.email_verified,
          user.premium,
          user.role,
        ]
      );

      const row = rows[0];

      const userOut: User = {
        id: row.id,
        name: row.name,
        email: row.email,
        username: row.username,
        password: row.password_hash,
        avatar_url: row.avatar_url,
        bio: row.bio,
        email_verified: row.email_verified,
        premium: row.premium,
        role: row.role,
        created_at: row.created_at,
      };

      return userOut;
    } catch (err: any) {
      throw new Error("Erro ao criar usuário");
    }
  }
  listUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
