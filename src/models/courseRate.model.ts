import "reflect-metadata";

import { BaseModel } from "./baseModel";
import User from "./user.model";
import Course from "./course.model";
import { Entity, Column, ManyToOne, Check } from "typeorm";
@Entity()
@Check(`"rate" > 0 AND "rate" < 6`)
export default class CourseRate extends BaseModel {
  @ManyToOne(() => Course, (course) => course.courseRate,{onDelete:"CASCADE",onUpdate:"CASCADE"})
  course: Course;

  @ManyToOne(() => User, (user) => user.courseRate,{onDelete:"CASCADE",onUpdate:"CASCADE"})
  user: User;
  
  @Column({type:'float', default: 1})
  rate: number;
}
