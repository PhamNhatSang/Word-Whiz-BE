import { Column, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./base-model";
import Group from "./group.model";
import User from "./user.model";
import Course from "./course.model";
import { Data } from "node-lombok";
@Table({modelName:'group_details'})
@Data()
export default class GroupDetail extends BaseModel<GroupDetail> {
    @ForeignKey(() => Group)
    @Column
    group_id: number

    @ForeignKey(() => User)
    @Column
    student_id: number

    @ForeignKey(() => Course)
    @Column
    course_id: number
    
}