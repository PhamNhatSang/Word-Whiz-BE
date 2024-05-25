import "reflect-metadata";
import { BaseModel } from "./baseModel";
import TestItem from "./testItem.model";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import User from "./user.model";
import Course from "./course.model";
@Entity()
export default class Test extends BaseModel {
  
  @Column({type:"int",name:'score',default:0})
  score: number;

  @Column({ type: "boolean",default:false,name:'is_first_done'} )
  isFirstDone: boolean;

  @ManyToOne(() => User, (user)=> user.myTests,{nullable:true})
  user: User;

  @ManyToOne(()=>Course,(course)=>course.tests,{nullable:true})
  course:Course;
  
  @OneToMany(() => TestItem, (testItem) => testItem.test, { nullable: true })
  testItems: TestItem[];
}
