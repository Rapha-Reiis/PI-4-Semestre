import { Request, Response } from "express";
import { HttpMethod, IRoutes } from "../routes";
import { IUsecase } from "core/usecases/Usecase";
import {
  UserCreateInputDto,
  UserCreateOutputDto,
} from "core/usecases/user/User-create.usecase";

export type CreateUserResponseDto = {
  id: string;
};

export class CreateUserRoute implements IRoutes {
  private constructor(
    private path: string,
    private method: HttpMethod,
    private createUserService: IUsecase<UserCreateInputDto, UserCreateOutputDto>
  ) {}

  public static create(UserCreateService: IUsecase<any, any>) {
    return new CreateUserRoute("/users", HttpMethod.POST, UserCreateService);
  }

  getHandler() {
    return async (request: Request, response: Response) => {
      const { name, username, email, password, avatar_url, bio } =
        request.body;

      const input: UserCreateInputDto = {
        name,
        username,
        email,
        password,
        avatar_url,
        bio,
      };

      const responseBody: UserCreateOutputDto =
        await this.createUserService.execute(input);

      response.status(201).json(responseBody);
    };
  }

  getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }
}
