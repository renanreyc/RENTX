import dayjs from "dayjs";

import { AppError } from "@errors/AppError";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/infra/repositories/in-memory/CarsRepositoryInMemory";



let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayJsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 10,
            category_id: "1234",
            brand: "brand test"
        })


        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");

    });

    it("should not be able to create a new rental if there is another open to them same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "1111",
            expected_return_date: dayAdd24Hours,
            user_id: "12345"
        });

        await expect(createRentalUseCase.execute({
                user_id: "12345",
                car_id: "22222",
                expected_return_date: dayAdd24Hours,
            })            
        ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
    });

    it("should not be able to create a new rental if there is another open to them same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "12345",
            expected_return_date: dayAdd24Hours,
            user_id: "11111"
        });

        await expect( createRentalUseCase.execute({
                user_id: "test user id2",
                car_id: "12345",
                expected_return_date: dayAdd24Hours,
            })            
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("should not be able to create a new rental with invalid return time", async () => {

        await expect(createRentalUseCase.execute({
                user_id: "test user id",
                car_id: "12345",
                expected_return_date: dayJsDateProvider.dateNow(),
            })            
        ).rejects.toEqual(new AppError("invalid return time!"));
    });
});