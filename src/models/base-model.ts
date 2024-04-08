import "reflect-metadata";

import { Model ,IsEmail} from "sequelize-typescript";
import {
  PrimaryKey,
  Column,
  AutoIncrement,
  DataType,
  
} from "sequelize-typescript";

export abstract class BaseModel<T> extends Model<T>{
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  
  @Column(DataType.STRING)  
  name:string
  set _createdAt(value: Date) {
    this.updatedAt = value;
  }

  get _createdAt() {
    return this.createdAt;
  }

  set _updatedAt(value: Date) {
    this.updatedAt = value;
  }

  get _updatedAt() {
    return this.updatedAt;
  }

  get _id() {
    return this.id;
  }
  
}
