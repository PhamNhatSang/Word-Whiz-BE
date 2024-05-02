import "reflect-metadata";
import { BaseModel } from "./baseModel";
import TestItem from "./testItem.model";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import User from "./user.model";
import Course from "./course.model";
@Entity({ name: "tests"})
export default class Test extends BaseModel {
  
  @Column()
  score: number;

  @Column({ type: "boolean",default:false} )
  is_first_done: boolean;

  @ManyToOne(() => User, (user)=> user.myTests,{nullable:true})
  user: User;

  @ManyToOne(()=>Course,(course)=>course.tests,{nullable:true})
  course:Course;
  
  @OneToMany(() => TestItem, (testItem) => testItem.test, { nullable: true })
  testItems: TestItem[];
}
