import { Table,Column, ForeignKey, BelongsTo ,BelongsToMany} from "sequelize-typescript";
import { BaseModel } from "./base-model";
import User from "./user.model";
import GroupDetail from "./group-detail.model";
import Course from "./course.model";
import { Data } from "node-lombok";

@Table({modelName:'groups'})
@Data()
export default class Group extends BaseModel<Group> {
    @Column
    group_name:string
    @Column
    group_description:string

    @ForeignKey(() => User)
    @Column
    owner_id: number

    @BelongsTo(() => User)
    owner: User

    @BelongsToMany(() => User, () => GroupDetail)
    students: User[]

    @BelongsToMany(() => Course, () => GroupDetail)
    courses: Course[]

}