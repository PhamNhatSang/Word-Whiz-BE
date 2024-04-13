import "reflect-metadata";

import { BaseModel } from "./base-model";

import { Role } from "../enum/Role";
import Group from "./group.model";
import GroupDetail from "./group-detail.model";
import Course from "./course.model";
import { Data } from "node-lombok";
import Post from "./post.model";
import Comment from "./comment.model";
import CourseRate from "./course-rate.model";
import { Entity, OneToMany } from "typeorm";
import { Column,PrimaryGeneratedColumn, } from "typeorm";
import React from "./react.model";
import { IsEmail } from "class-validator";
@Entity({name:"users"})
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
  @OneToMany(() => Group,(group)=>group.owner,{nullable:true})
  myGroups: Group[];

  @OneToMany(() => Course,(course)=>course.owner,{nullable:true})
  myCourses: Course[];
  
  @OneToMany(() => Post,(post)=>post.owner,{nullable:true})
  myPosts: Post[];

  @OneToMany(()=>CourseRate,(courseRate)=>courseRate.user,{nullable:true})
  courseRate:CourseRate[]

  @OneToMany(()=> GroupDetail,(groupDetail)=>groupDetail.student,{nullable:true})
  groupDetails:GroupDetail[]

  @OneToMany(()=>Comment,(comment)=>comment.user,{nullable:true})
  myComments:Comment[]

  @OneToMany(()=>React,(react)=>react.user,{nullable:true})
  myReacts:React[]

  
}
