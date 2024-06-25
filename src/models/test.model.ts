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
  
  @Column({ type: "boolean",default:false,name:'is_done'} )
  isDone: boolean;

  @ManyToOne(() => User, (user)=> user.myTests,{nullable:true,onDelete:'CASCADE',onUpdate:'CASCADE'})
  user: User;

  @ManyToOne(()=>Course,(course)=>course.tests,{nullable:true,onDelete:'CASCADE',onUpdate:'CASCADE'})
  course:Course;
  
  @OneToMany(() => TestItem, (testItem) => testItem.test, { nullable: true,cascade:true })
  testItems: TestItem[];
}
