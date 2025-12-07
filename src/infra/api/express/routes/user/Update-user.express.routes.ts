import { Request, Response } from "express";
import { HttpMethod, IRoutes } from "../routes";
import { IUsecase } from "@core/usecases/Usecase";
import {
  UpdateUserInputDto,
  UpdateUserOutputDto,
} from "@core/usecases/user/Update-users.usecase";

export class UpdateUserRoute implements IRoutes {
  private constructor(
    private path: string,
    private method: HttpMethod,
    private updateUserService: IUsecase<UpdateUserInputDto, UpdateUserOutputDto>
  ) {}

  public static create(UpdateUC: IUsecase<any, any>) {
    return new UpdateUserRoute("/users/update", HttpMethod.PUT, UpdateUC);
  }

  getHandler() {
    return async (req: Request, res: Response) => {
      const { name, username, email, password, avatar_url, bio, premium } =
        req.body as {
          name?: string;
          username?: string;
          email?: string;
          password?: string;
          avatar_url?: string;
          bio?: string;
          premium?: boolean;
        };

      const { userId } = req.query as { userId: string };
      if (!userId) throw new Error("Não foi passado o usuário corretamente");

      const input: UpdateUserInputDto = {
        ...req.body,
        userId: userId,
      };

      const output = await this.updateUserService.execute(input);

      res.status(200).json(output);
    };
  }

  getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }
}
