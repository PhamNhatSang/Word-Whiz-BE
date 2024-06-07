import "reflect-metadata";

import { BaseModel } from "./baseModel";
import User from "./user.model";
import Comment from "./comment.model";
import React from "./react.model";
import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import Course from "./course.model";
@Entity()
export default class Post extends BaseModel {
  @ManyToOne(() => User, (user) => user.myPosts,{onDelete:"CASCADE"})
  owner: User;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "text", nullable: true})
  image: string;

  @OneToMany(() => Comment, (comment) => comment.post, { nullable: true, cascade: true})
  postComments: Comment[];

  @OneToMany(() => React, (react) => react.post, { nullable: true, cascade: true})
  postReacts: React[];


  @ManyToMany(() => Course, (cousre) => cousre.addedPosts,{nullable:true})
  @JoinTable({
    name: "post_courses",
    joinColumn: {
      name: "post_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "course_id",
      referencedColumnName: "id",
    },
  })
  courses: Course[];
}
