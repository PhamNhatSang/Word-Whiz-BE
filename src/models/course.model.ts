import "reflect-metadata";

import { Accessiblity } from "../enum/Accessiblity";
import { BaseModel } from "./base-model";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Table,
} from "sequelize-typescript";
import Group from "./group.model";
import GroupDetail from "./group-detail.model";

import User from "./user.model";
import Word from "./word.model";
import Test from "./test.model";
import { Data } from "node-lombok";
import CourseRate from "./course-rate.model";

@Table({ modelName: "courses" })
@Data()

export default class Course extends BaseModel<Course> {
  @ForeignKey(() => User)
  @Column
  owner_id: number;

 
  @BelongsTo(() => User)
  owner: User;
  
  @Column
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.ENUM("public", "private"))
  accessiblity: Accessiblity;


  @Column(DataType.BOOLEAN)
  is_creadted: boolean;

  @HasMany(() => Word)
  words: Word[];

  @HasOne(() => Test)
  test: Test;

  @BelongsToMany(() => Group, () => GroupDetail)
  groups: Group[];

  @BelongsToMany(() => User, () => CourseRate)
  userRates: Array<User & { CourseRate: CourseRate }>;
}
