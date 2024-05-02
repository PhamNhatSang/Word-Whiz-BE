import "reflect-metadata";

import { Accessiblity } from "../enum/Accessiblity";
import { BaseModel } from "./baseModel";

import Group from "./group.model";

import User from "./user.model";
import Word from "./word.model";
import Test from "./test.model";
import { Data } from "node-lombok";
import CourseRate from "./courseRate.model";
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity()
export default class Course extends BaseModel {
  @ManyToOne(() => User, (user) => user.myCourses)
  owner: User;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;
  
  @Column({ type: "enum", enum: ["PUBLIC", "PRIVATE"], default: "PUBLIC" })
  accessiblity: Accessiblity;

  @OneToMany(() => Word, (word) => word.course, { nullable: true })
  words: Word[];

  @OneToMany(() => Test, (test) => test.course, { nullable: true })
  tests: Test[];
  
  @OneToMany(() => CourseRate, (courseRate) => courseRate.course,{nullable:true})
  courseRate: CourseRate[];

  @ManyToMany(() => Group, (group) => group.courses, { nullable: true })
  addedGroups: Group[];


  @ManyToMany(() => User, (user) => user.courseImports, { nullable: true })
  @JoinTable({
    name: "course_imports", // table name for the junction table of this relation
    joinColumn: {
        name: "courses",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "users",
        referencedColumnName: "id"
    }
})
  userImporteds: User[];

}
