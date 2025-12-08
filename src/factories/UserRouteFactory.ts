import { IUserRepository } from "@core/repositories/IUser.repository";
import { UserDeleteUsecase } from "@core/usecases/user/Delete-user.usecase";
import { GetUserByIdUsecase } from "@core/usecases/user/Get-user-by-id.usecase";
import { SearchUserUsecase } from "@core/usecases/user/Search-users.usecase";
import { UpdateUserUsecase } from "@core/usecases/user/Update-users.usecase";
import { UserCreateUsecase } from "@core/usecases/user/User-create.usecase";
import { IRoutes } from "infra/api/express/routes/routes";
import { CreateUserRoute } from "infra/api/express/routes/user/Create-user.express.routes";
import { UserDeleteRoute } from "infra/api/express/routes/user/Delete-user.express.routes";
import { SearchUserRoute } from "infra/api/express/routes/user/Search-user.express.routes";
import { UpdateUserRoute } from "infra/api/express/routes/user/Update-user.express.routes";
import { UserByIdRoute } from "infra/api/express/routes/user/User-by-id.express.route";
import { VerifyUserExistById } from "services/VerifyUserExist";
import "dotenv/config";

export class UserRoutesFactory {
  public useRoutes: IRoutes[] = [];

  constructor(
    private userRepo: IUserRepository,
    private verifyUser: VerifyUserExistById
  ) {
    const userCreateUC = new UserCreateUsecase(userRepo);
    const usersearchUC = new SearchUserUsecase(userRepo);
    const userByIdUC = new GetUserByIdUsecase(userRepo);
    const UserUpdateUC = new UpdateUserUsecase(userRepo, verifyUser);
    const userDeleteUC = new UserDeleteUsecase(userRepo, verifyUser);
    //
    const userCreateRoutes = CreateUserRoute.create(userCreateUC);
    const userSearchRouters = SearchUserRoute.create(usersearchUC);
    const userByIdRouters = UserByIdRoute.create(userByIdUC);
    const userUpdateRoutes = UpdateUserRoute.create(UserUpdateUC);
    const userDeleteRoutes = UserDeleteRoute.create(userDeleteUC);

    this.useRoutes = [
      userCreateRoutes,
      userSearchRouters,
      userByIdRouters,
      userUpdateRoutes,
      userDeleteRoutes,
    ];
  }

  public GetRoutes(): IRoutes[] {
    return this.useRoutes;
  }
}
