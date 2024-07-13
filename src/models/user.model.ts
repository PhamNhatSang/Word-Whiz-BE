import "reflect-metadata";

import { BaseModel } from "./baseModel";

import { Role } from "../enum/Role";
import Group from "./group.model";
import Course from "./course.model";
import Post from "./post.model";
import Comment from "./comment.model";
import CourseRate from "./courseRate.model";
import { Entity, ManyToMany, OneToMany } from "typeorm";
import { Column, } from "typeorm";
import React from "./react.model";
import { IsEmail } from "class-validator";
import Test from "./test.model";
import Learning from "./learning.model";
import FeedBack from "./feedback.model";
@Entity()
export default class User extends BaseModel {
  @Column({nullable:true})
  name: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  password: string;

  @Column({type:"enum",enum:["ADMIN","STUDENT","TEACHER"],default:"STUDENT"})
  role: Role;

  @Column({nullable:true})
  refeshToken: string;

  @Column({nullable:true})
  avatar: string;

  @OneToMany(() => Group,(group)=>group.owner,{nullable:true,cascade:true})
  myGroups: Group[];

  @OneToMany(() => Course,(course)=>course.owner,{nullable:true,cascade:true})
  myCourses: Course[];  
  
  @OneToMany(() => Post,(post)=>post.owner,{nullable:true,cascade:true})
  myPosts: Post[];

  @OneToMany(()=>CourseRate,(courseRate)=>courseRate.user,{nullable:true,cascade:true})
  courseRate:CourseRate[]

  @OneToMany(()=>Comment,(comment)=>comment.user,{nullable:true,cascade:true})
  myComments:Comment[]

  @OneToMany(()=>React,(react)=>react.user,{nullable:true,cascade:true})
  myReacts:React[]

  @OneToMany(()=>Test,(test)=>test.user,{nullable:true,cascade:true})
  myTests:Test[]

  @ManyToMany(()=>Course,(course)=>course.userImporteds,{nullable:true,cascade:true})
  courseImports:Course[]

  @ManyToMany(() => Group, (group) => group.students, { nullable: true })
  addedGroups: Group[];
  
  @OneToMany(() => Learning, (learning) => learning.user, { nullable: true,cascade:true})
  learnings: Learning[];

  @OneToMany(()=>(FeedBack),(feedback)=>feedback.user,{nullable:true,cascade:true})
  feedbacks:FeedBack[]

  
}
