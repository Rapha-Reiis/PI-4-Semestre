import { IUsecase } from "../Usecase";
import { IUserRepository } from "@core/repositories/IUser.repository";

export type searchInputDTO = {
  username: string;
};

export type searchOutputDto = {
  id: string;
  name: string;
  username: string;
  email: string;
}[];

export class SearchUserUsecase
  implements IUsecase<searchInputDTO, searchOutputDto>
{
  constructor(private userRepo: IUserRepository) {}

  async execute(input: searchInputDTO): Promise<searchOutputDto> {
    return await this.userRepo.searchUsers(input.username);
  }
}
