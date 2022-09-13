
import { CarsRepositoryInMemory } from "@modules/cars/infra/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Carro 1",
            "description": "Car description",
            "daily_rate": 100,
            "license_plate": "ADM-1234", 
            "fine_amount": 100, 
            "brand": "Car_brand", 
            "category_id": "category_id"
        });
        
        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Carro 2",
            "description": "Car description",
            "daily_rate": 100,
            "license_plate": "ADM-1234", 
            "fine_amount": 100, 
            "brand": "Car_bran_teste", 
            "category_id": "category_id"
        });
        
        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_bran_teste"
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Carro_name_teste",
            "description": "Car description",
            "daily_rate": 100,
            "license_plate": "ADM-12347", 
            "fine_amount": 100, 
            "brand": "brand", 
            "category_id": "category_id"
        });
        
        const cars = await listAvailableCarsUseCase.execute({
            name: "Carro_name_teste"
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Carro 5",
            "description": "Car description",
            "daily_rate": 100,
            "license_plate": "ADM-123479", 
            "fine_amount": 100, 
            "brand": "brand", 
            "category_id": "12345"
        });
        
        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345"
        });

        expect(cars).toEqual([car]);
    });
});