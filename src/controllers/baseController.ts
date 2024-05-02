import "reflect-metadata";

import { BaseModel } from "../models/baseModel";
import { BaseService } from "../services/base/base.service";
export abstract class BaseController<Entity extends BaseModel,Service extends BaseService<Entity> > {
    protected service: Service;

    constructor(service: Service) {
        this.service = service;
    }

    
}