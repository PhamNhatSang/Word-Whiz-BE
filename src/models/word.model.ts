import "reflect-metadata";

import { BaseModel } from "./baseModel";
import Course from "./course.model";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import TestItem from "./testItem.model";
@Entity()
export default class Word extends BaseModel {
  @ManyToOne(() => Course, (course) => course.words,{onDelete:'CASCADE',onUpdate:'CASCADE'})
  course: Course;

  
  @OneToMany(() => TestItem, (testItem) =>testItem.word,{nullable:true,cascade:true} )
  testItems: TestItem[];
  
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
