import "reflect-metadata";

import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./base-model";
import Course from "./course.model";
import { Data } from "node-lombok";
@Table({ modelName: "words" })
@Data()
export default class Word extends BaseModel<Word> {

  @ForeignKey(() => Course)
  @Column
  course_id: number;
  
  @BelongsTo(() => Course)
  course: Course;

  @Column
  term: string;

  @Column(DataType.TEXT)
  definition: string;

  @Column(DataType.TEXT)
  example: string;

  @Column(DataType.TEXT)
  explanation: string;

  @Column
  image: string;
}
