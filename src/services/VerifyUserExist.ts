import { IUserRepository } from "@core/repositories/IUser.repository";
import { IService } from "./IService";
import { getUserByIdInput, getUserByIdOutput } from "@core/usecases/user/Get-user-by-id.usecase";




export class VerifyUserExistById implements IService<getUserByIdInput, getUserByIdOutput>{

    constructor(private userRepo: IUserRepository){}


    execute(input: getUserByIdInput): Promise<getUserByIdOutput> {
        const user = this.userRepo.getUserById(input.userId)
        if(!user){
            throw new Error("Usuário não cadastrado")
        }

        return user
    }

}