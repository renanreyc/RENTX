import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/entities/UserTokens";
import { getRepository, Repository } from "typeorm";
import { IUsersTokensRepository } from "../IUsersTokenRepository";


export class  UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor(){
        this.repository = getRepository(UserTokens);
    }

    async create({ 
        expires_date, 
        refresh_token, 
        user_id 
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        })        

        await this.repository.save(userToken);

        return userToken;        
    }


}