import "reflect-metadata";

import { BaseModel } from "./base-model";
import User from "./user.model";
import Comment from "./comment.model";
import React from "./react.model";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
@Entity({ name: "posts" })
export default class Post extends BaseModel {
  @ManyToOne(() => User, (user) => user.myPosts)
  owner: User;

  @Column({ type: "text" })
  content: string;

  @Column()
  image: string;

  @OneToMany(() => Comment, (comment) => comment.post, { nullable: true })
  postComments: Comment[];

  @OneToMany(() => React, (react) => react.post)
  postReacts: React[];
}
