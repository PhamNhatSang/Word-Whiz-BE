import "reflect-metadata";

import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { BaseModel } from "./base-model";
import { Data } from "node-lombok";
import User from "./user.model";
import Comment from "./comment.model";
import CourseRate from "./course-rate.model";
import React from "./react.model";
@Table({ modelName: "posts" })
@Data()
export default class Post extends BaseModel<Post> {
    
  @ForeignKey(() => User)
  @Column
  owner_id: number;

  @BelongsTo(() => User)
  owner: User;

  @Column(DataType.TEXT)
  content: string;

  @Column
  image: string;

  @BelongsToMany(() => User, () => Comment)
  userComment: Array<User & { Comment: Comment }>;

  @BelongsToMany(() => User, () => React)
  userReacts: Array<User & { React: React }>;
}
