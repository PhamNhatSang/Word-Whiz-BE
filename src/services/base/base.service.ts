import "reflect-metadata";
import { BaseModel } from "../../models/baseModel";
import { database } from "../../database";
import { EntityManager, Repository } from "typeorm";
import { BaseEntity } from "typeorm";
import { manager } from "../../database";
export abstract class BaseService {
    protected manager: EntityManager

    constructor(){
        this.manager = manager;
    }

    async create<T extends BaseModel>(entity: new () => T,entityData:T): Promise<T> {
        return await this.manager.getRepository(entity).save(entityData);
    }

    async update<T extends BaseModel>(entity: new () => T,entityData:T): Promise<T> {
        return await this.manager.getRepository(entity).save(entityData);
    }

    async delete<T extends BaseModel>(entity: new () => T, id: any): Promise<void> {
         await this.manager.getRepository(entity).delete({id: id});
    }

    async getAll<T extends BaseModel>(entity: new () => T): Promise<T[]> {
        return await this.manager.find(entity)
    }
    async getById<T extends BaseModel>(entity: new () => T, id: any): Promise<T> {
        return await this.manager.findOne(entity, id)
    }
    
    
}