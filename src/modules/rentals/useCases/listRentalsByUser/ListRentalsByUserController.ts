import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserCase } from "./ListRentalsByUserUseCase";


export class ListRentalsByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const listRentalsByUserCase = container.resolve(ListRentalsByUserCase);

        const rentals = await listRentalsByUserCase.execute(id);

        return response.json(rentals);
    }
}