import "reflect-metadata";

import { BaseModel } from "./base-model";
import User from "./user.model";
import Post from "./post.model";

import { Entity, ManyToOne, Column } from "typeorm";
@Entity({ name: "comments" })
export default class Comment extends BaseModel {
  @ManyToOne(() => User, (user) => user.myComments)
  user: User;

  @ManyToOne(() => Post, (post) => post.postComments)
  post: Post;

  @Column()
  content: string;
}
