import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./base-model";
import User from "./user.model";
import Post from "./post.model";
import { Emotion } from "../enum/Emotion";
import { Data } from "node-lombok";
@Table({modelName:'reacts'})
@Data()
export default class React extends BaseModel<React> {

    @ForeignKey(() => User)
    @Column
    user_id: number


    @ForeignKey(() => Post)
    @Column
    post_id: number

    @Column(DataType.ENUM('LIKE', 'HAHA', 'WOW', 'SAD', 'ANGRY'))
    emotion: Emotion
    
}