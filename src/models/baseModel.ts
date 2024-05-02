import "reflect-metadata";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  
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
