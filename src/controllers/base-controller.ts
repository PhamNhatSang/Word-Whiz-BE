import "reflect-metadata";

import { BaseModel } from "../models/base-model";
import { BaseService } from "../services/base.service";
export abstract class BaseController<Entity extends BaseModel<Entity>,Service extends BaseService<Entity> > {
    protected service: Service;

    constructor(service: Service) {
        this.service = service;
    }

    async getAll(): Promise<Entity[]> {
        return await this.service.getAll();
    }
}