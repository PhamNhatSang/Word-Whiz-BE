import "reflect-metadata";

import { Accessiblity } from "../enum/Accessiblity";
import { BaseModel } from "./base-model";

import Group from "./group.model";
import GroupDetail from "./group-detail.model";

import User from "./user.model";
import Word from "./word.model";
import Test from "./test.model";
import { Data } from "node-lombok";
import CourseRate from "./course-rate.model";
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";

@Entity({ name: "courses" })
export default class Course extends BaseModel {
  @ManyToOne(() => User, (user) => user.myCourses)
  owner: User;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "enum", enum: ["PUBLIC", "PRIVATE"], default: "PUBLIC" })
  accessiblity: Accessiblity;

  @Column({ type: "boolean" })
  is_creadted: boolean;

  @OneToMany(() => Word, (word) => word.course, { nullable: true })
  words: Word[];

  @OneToOne(() => Test)
  @JoinColumn()
  test: Test;

  @OneToMany(() => GroupDetail, (groupDetail) => groupDetail.course)
  groupDetails: GroupDetail[];

  @OneToMany(() => CourseRate, (courseRate) => courseRate.course)
  courseRate: CourseRate[];
}
