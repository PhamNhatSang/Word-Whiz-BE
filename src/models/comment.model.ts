import { Column, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./base-model";
import User from "./user.model";
import Post from "./post.model";
import { Data } from "node-lombok";
@Table({modelName:'comments'})
@Data()
export default class Comment extends BaseModel<Comment> {
    @ForeignKey(() => User)
    @Column
    user_id: number



    @ForeignKey(() => Post)
    @Column
    post_id: number

    @Column
    content: string
}