import { Specification } from "../entities/Specification";

interface ISpecificationsRepositoryDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    
    create({ description, name }: ISpecificationsRepositoryDTO): void;
    findByName(name: string): Specification;
}

export { ISpecificationsRepository, ISpecificationsRepositoryDTO }