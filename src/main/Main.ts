import { UserCreateUsecase } from "../core/usecases/user/User-create.usecase";
import { ApiExpress } from "../infra/api/express/api.express";
import { CreateUserRoute } from "infra/api/express/routes/user/Create-user.express.routes";
import { PostgresDbConfig } from "infra/data/Config/Postgres/Postgres-db.config";
import { UserSqlRepository } from "infra/data/repositories/sql/user/User-sql.repository";
import "dotenv/config";
import { UserPrismaRepository } from "infra/data/repositories/prisma/user/User-prisma.repository";
import { SearchUserUsecase } from "@core/usecases/user/Search-users.usecase";
import { SearchUserRoute } from "infra/api/express/routes/user/Search-user.express.routes";
import { GetUserByIdUsecase } from "@core/usecases/user/Get-user-by-id.usecase";
import { UserByIdRoute } from "infra/api/express/routes/user/User-by-id.express.route";

function main() {
  const db = new PostgresDbConfig();

  const userSqlRepo = new UserSqlRepository(db);
  const userPrismaRepo = new UserPrismaRepository(db.prisma);

  const UserCreateUC = new UserCreateUsecase(userPrismaRepo);
  const searchUC = new SearchUserUsecase(userPrismaRepo);
  const userByIdUC = new GetUserByIdUsecase(userPrismaRepo);

  const UserCreateRoutes = CreateUserRoute.create(UserCreateUC);
  const SearchRouters = SearchUserRoute.create(searchUC);
  const UserByIdRouters = UserByIdRoute.create(userByIdUC);

  const port = 3000;

  const api = ApiExpress.create([
    UserCreateRoutes,
    SearchRouters,
    UserByIdRouters,
  ]);

  api.start(port);
}

main();
