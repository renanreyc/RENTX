import { Specification } from "../model/Specification";

interface ISpecificationsRepositoryDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    
    create({ description, name }: ISpecificationsRepositoryDTO): void;
    findByName(name: string): Specification;
}

export { ISpecificationsRepository, ISpecificationsRepositoryDTO }