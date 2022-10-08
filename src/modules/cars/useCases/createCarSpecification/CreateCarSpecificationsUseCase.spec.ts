import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/infra/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/infra/repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;


describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        );
    })

    it("should not be able to add a new specification to a now-existent car", async () => {
        const car_id = "1234";;
        const specifications_id = ["54321"];
        await expect(createCarSpecificationUseCase.execute({car_id, specifications_id })
        ).rejects.toEqual(new AppError("Car doesn't exists!"));

    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car Test",
            description: "Description Car Test",
            "daily_rate": 10,
            license_plate: "ABC-1234",
            fine_amount: 20,
            brand: "Brand test",
            category_id: "category_id test"
        });

        const specification = await specificationRepositoryInMemory.create({
            description: "test",
            name: "test"
        })

        const specifications_id = [specification.id];

        const specificationCars =  await createCarSpecificationUseCase.execute({
            car_id: car.id, 
            specifications_id 
        });
        
        expect(specificationCars).toHaveProperty("specifications");
        expect(specificationCars.specifications.length).toBe(1);
    });

});