import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    

    async execute({ email, password }): Promise<IResponse>{
        // Usuario Existe
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError("Email or password incorrect!");
        }

        // Senha está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        // Gerar jsonwebtoken
        const token = sign({}, "408498c5e2b1e78f6ccfdaa4c3d27d39", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenResponse: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenResponse;
    }
}

export { AuthenticateUserUseCase }