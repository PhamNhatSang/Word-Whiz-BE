import "reflect-metadata";

import { BaseModel } from "./base-model";
import {
  Table,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { Role } from "../enum/Role";
import Group from "./group.model";
import GroupDetail from "./group-detail.model";
import Course from "./course.model";
import { Data } from "node-lombok";
import Post from "./post.model";
import Comment from "./comment.model";
import CourseRate from "./course-rate.model";
import React from "./react.model";
@Table({ modelName: "users" })
@Data()
export default class User extends BaseModel<User> {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column(DataType.ENUM("admin", "student", "teacher"))
  role: Role;

  @HasMany(() => Group)
  my_groups: Group[];

  @HasMany(() => Course)
  my_courses: Course[];

  @HasMany(() => Post)
  my_posts: Post[];

  @BelongsToMany(() => Group, () => GroupDetail)
  groups: Group[];

  @BelongsToMany(() => Post, () => Comment)
  postComments: Array<Post & { Comment: Comment }>;

  @BelongsToMany(() => Post, () => React)
  postReacts: Array<Post & { React: React }>;

  @BelongsToMany(() => Course, () => CourseRate)
  postRates: Array<Course & { CourseRate: CourseRate }>;
}
