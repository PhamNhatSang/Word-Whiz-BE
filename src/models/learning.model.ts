import { join } from 'path';
import "reflect-metadata";

import { BaseModel } from "./baseModel";
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import User from "./user.model";
import Course from "./course.model";
@Entity()
export default class Learning extends BaseModel {
  @ManyToOne(() => User, (user) => user.learnings)
  @JoinColumn({ name: "user_id"})
  user: User;

  @ManyToOne(() => Course, (course) => course.learnings,{onDelete:'CASCADE',onUpdate:'CASCADE'})
  @JoinColumn({ name: "course_id"})
  course: Course;

  @Column({ default: 0 })
  lastWordIndex: number; 

  @Column({default: false})
  isDone: boolean;
}
