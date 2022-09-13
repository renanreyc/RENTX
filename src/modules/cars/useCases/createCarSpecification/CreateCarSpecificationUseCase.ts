import { inject, injectable } from "tsyringe";


import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/infra/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        
        const carExists = await this.carsRepository.findById(car_id);

        if(!carExists) {
            throw new AppError("Car doesn't exists!")
        }

        const specifications = await this.specificationsRepository.findByIds(
            specifications_id
        );
        
        carExists.specifications = specifications;

        await this.carsRepository.create(carExists);

        return carExists;

    }
}

export { CreateCarSpecificationUseCase }