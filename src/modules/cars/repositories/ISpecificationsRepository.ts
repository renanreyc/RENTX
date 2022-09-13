import { Specification } from "../infra/entities/Specification";


interface ISpecificationsRepositoryDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    
    create({ description, name }: ISpecificationsRepositoryDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ISpecificationsRepositoryDTO }