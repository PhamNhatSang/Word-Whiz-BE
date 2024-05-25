import "reflect-metadata";

import { BaseModel } from "./baseModel";
import Course from "./course.model";
import { Entity, Column, ManyToOne } from "typeorm";
@Entity()
export default class Word extends BaseModel {
  @ManyToOne(() => Course, (course) => course.words,{onDelete:'CASCADE',onUpdate:'CASCADE'})
  course: Course;

  


  @Column()
  term: string;


  @Column({ type: "text" })
  definition: string;

  @Column({ type: "text" ,nullable:true})
  example: string;

  @Column({ type: "text",nullable:true })
  explanation: string;

  @Column({nullable:true})
  image: string;
}
