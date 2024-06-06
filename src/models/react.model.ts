import "reflect-metadata";

import { BaseModel } from "./baseModel";
import User from "./user.model";
import Post from "./post.model";
import { Emotion } from "../enum/Emotion";
import { Entity, ManyToOne, Column } from "typeorm";
@Entity()
export default class React extends BaseModel {
  @ManyToOne(() => User, (user) => user.myReacts)
  user: User;

  @ManyToOne(() => Post, (post) => post.postReacts, { onDelete: "CASCADE" ,onUpdate:"CASCADE"})
  post: Post;

  @Column({
    type: "enum",
    enum: ["LIKE", "SAD", "HAHA", "WOW", "LOVE", "ANGRY","NONE"],
    default: "LiKE",
  })
  emotion: Emotion;
}
