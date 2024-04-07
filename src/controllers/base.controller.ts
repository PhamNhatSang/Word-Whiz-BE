import { BaseModel } from "../models/base-model";
import { BaseService } from "../services/base.service";
export abstract class BaseController<Entity extends BaseModel<Entity>> {
    private service: BaseService<Entity>;

    constructor(service: BaseService<Entity>) { 
        this.service = service;
    }

    async getAll(): Promise<Entity[]> {
        return await this.service.getAll();
    }
}