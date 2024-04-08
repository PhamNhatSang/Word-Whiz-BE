import "reflect-metadata";
import { BaseModel } from "../models/base-model";
export declare abstract class BaseService<Entity extends BaseModel<Entity>> {
    private repository;
    constructor(entity: new () => Entity);
    getAll(): Promise<Entity[]>;
    getById(id: number): Promise<Entity | null>;
    create(entity: any): Promise<Entity>;
    update(id: any, entity: Entity): Promise<Entity | null>;
    delete(id: any): Promise<void>;
}
