import "reflect-metadata";
import { Model } from "sequelize-typescript";
export declare abstract class BaseModel<T> extends Model<T> {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    set _createdAt(value: Date);
    get _createdAt(): Date;
    set _updatedAt(value: Date);
    get _updatedAt(): Date;
    get _id(): number;
}
