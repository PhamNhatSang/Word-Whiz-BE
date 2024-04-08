import "reflect-metadata";
import { BaseModel } from "./base-model";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import Course from "./course.model";
import TestItem from "./test-item.model";
import { Data } from "node-lombok";
@Table({modelName:'tests'})
@Data()
export default class Test extends BaseModel<Test> {
    @ForeignKey(() => Course)
    @Column
   
    course_id: number;

    @BelongsTo(() => Course)
    course: Course;

   
    @HasMany(() => TestItem)
    test_items: TestItem[];

    
    @Column
    score: number;
    
    @Column(DataType.BOOLEAN)
    is_first_done: boolean;


    
}