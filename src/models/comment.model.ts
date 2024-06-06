import "reflect-metadata";

import { BaseModel } from "./baseModel";
import User from "./user.model";
import Post from "./post.model";

import { Entity, ManyToOne, Column } from "typeorm";
@Entity()
export default class Comment extends BaseModel {
  @ManyToOne(() => User, (user) => user.myComments, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Post, (post) => post.postComments, { onDelete: "CASCADE" })
  post: Post;

  @Column()
  content: string;
}
