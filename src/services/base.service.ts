import "reflect-metadata";
import { BaseModel } from "../models/base-model";
import { database } from "../database";
import { Repository } from "typeorm";
export abstract class BaseService<Entity extends BaseModel> {
    protected repository: Repository<Entity>;

    constructor(entity: new () => Entity){
        this.repository = database.getRepository(entity);
    }
    
    async  getAll(): Promise<Entity[]> {
        return await this.repository.find()
    }
    async getById(id: any): Promise<Entity | null> {
        return await this.repository.findOneBy({id:id})
    }

    async create(entity: Entity): Promise<Entity> {
        return await this.repository.save(entity);
    }
    async update(entity: Entity): Promise<Entity | null> {
        return await this.repository.save(entity)
        
    }
    async delete(id: any): Promise<void> {
        await this.repository.delete(id)
    }
}