import dayjs from "dayjs";

import { AppError } from "@errors/AppError";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";



let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayJsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider);
    });

    it("should be able to create a new rental", async () => {

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "123123",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");

    });

    it("should not be able to create a new rental if there is another open to them same user", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "test car id",
                expected_return_date: dayAdd24Hours,
            });
    
            
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "test car id2",
                expected_return_date: dayAdd24Hours,
            });
    
            
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if there is another open to them same car", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "test user id",
                car_id: "12345",
                expected_return_date: dayAdd24Hours,
            });
    
            
            await createRentalUseCase.execute({
                user_id: "test user id2",
                car_id: "12345",
                expected_return_date: dayAdd24Hours,
            });
    
            
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental with invalid return time", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "test user id",
                car_id: "12345",
                expected_return_date: dayJsDateProvider.dateNow(),
            });
            
        }).rejects.toBeInstanceOf(AppError);
    });
});