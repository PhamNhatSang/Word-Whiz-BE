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
import Learning from "./learning.model";
import Post from './post.model'

@Entity()
export default class Course extends BaseModel {
  @ManyToOne(() => User, (user) => user.myCourses, { onDelete: "CASCADE",onUpdate:"CASCADE" })
  owner: User;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;
  
  @Column({ type: "enum", enum: ["PUBLIC", "PRIVATE"], default: "PUBLIC" })
  accessiblity: Accessiblity;

  @OneToMany(() => Word, (word) => word.course, { nullable: true,cascade:true})
  words: Word[];

  @OneToMany(() => Test, (test) => test.course, { nullable: true,cascade:true })
  tests: Test[];
  
  @OneToMany(() => CourseRate, (courseRate) => courseRate.course,{nullable:true,cascade:true})
  courseRate: CourseRate[];
  @OneToMany(() => Learning, (learning) => learning.course, { nullable: true,cascade:true })
  learnings: Learning[];
  @ManyToMany(() => Group, (group) => group.courses, { nullable: true })
  addedGroups: Group[];

  @ManyToMany(() => Post, (post) => post.courses, { nullable: true })
  addedPosts: Post[];


  @ManyToMany(() => User, (user) => user.courseImports, { nullable: true,onDelete:"CASCADE",onUpdate:"CASCADE"})
  @JoinTable({
    name: "course_imports", // table name for the junction table of this relation
    joinColumn: {
        name: "course_id",
        referencedColumnName: "id"
        
        
    },
    inverseJoinColumn: {
        name: "user_id",
        referencedColumnName: "id"
    }
    
    
})
  userImporteds: User[];

}
