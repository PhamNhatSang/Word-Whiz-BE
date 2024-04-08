import { BaseModel } from "../models/base-model";
import { database } from "../database";
import { Repository } from "sequelize-typescript";
export abstract class BaseService<Entity extends BaseModel<Entity>> {
    private repository: Repository<Entity>;

    constructor(entity: new () => Entity){
        this.repository = database.getRepository(entity);
    }
    
    async  getAll(): Promise<Entity[]> {
        return await this.repository.findAll();
    }
    async getById(id: number): Promise<Entity | null> {
        return await this.repository.findByPk(id);
    }

    async create(entity: any): Promise<Entity> {
        return await this.repository.create(entity);
    }
    async update(id :any ,entity: Entity): Promise<Entity | null> {
        await this.repository.update(entity, { where: { id } });
        return await this.repository.findByPk(id);
    }
    async delete(id: any): Promise<void> {
        await this.repository.destroy({ where: { id } });
    }
}