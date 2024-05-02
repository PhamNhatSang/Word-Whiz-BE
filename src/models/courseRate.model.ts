import "reflect-metadata";

import { BaseModel } from "./baseModel";
import User from "./user.model";
import Course from "./course.model";
import { Entity, Column, ManyToOne } from "typeorm";
@Entity()
export default class CourseRate extends BaseModel {
  @ManyToOne(() => Course, (course) => course.courseRate)
  course: Course;

  @ManyToOne(() => User, (user) => user.courseRate)
  user: User;
  
  @Column()
  rate: number;
}
