import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../entities/UserTokens";


export interface IUsersTokensRepository {
    create({
      expires_date,
      refresh_token,
      user_id,
    }: ICreateUserTokenDTO): Promise<UserTokens>;
}