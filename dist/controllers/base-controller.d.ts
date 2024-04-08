import "reflect-metadata";
import { BaseModel } from "../models/base-model";
import { BaseService } from "../services/base.service";
export declare abstract class BaseController<Entity extends BaseModel<Entity>> {
    protected service: BaseService<Entity>;
    constructor(service: BaseService<Entity>);
    getAll(): Promise<Entity[]>;
}
