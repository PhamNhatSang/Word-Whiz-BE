import "reflect-metadata";

import { BaseModel } from "./base-model";
import {  Column, ForeignKey, Table } from "sequelize-typescript";
import User from "./user.model";
import Course from "./course.model";
@Table({ modelName: "course_rates" })
export default class CourseRate extends BaseModel<CourseRate> {
    @ForeignKey(() => Course)
    @Column
    course_id: number;

    @ForeignKey(() => User)
    @Column
    user_id: number;

    @Column
    rate: number;
   
}