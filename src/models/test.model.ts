import "reflect-metadata";
import { BaseModel } from "./baseModel";
import TestItem from "./testItem.model";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import User from "./user.model";
import Course from "./course.model";
import Group from "./group.model";
import TestGroup from "./testGroup.model";
import FeedBack from "./feedback.model";
@Entity()
export default class Test extends BaseModel {
  
  @Column({type:"int",name:'score',default:0})
  score: number;

  @ManyToOne(()=>TestGroup,(testGroup)=>testGroup.tests,{nullable:true,onDelete:'CASCADE',onUpdate:'CASCADE'})
  testGroup:TestGroup;

  
  @Column({ type: "boolean",default:false,name:'is_done'} )
  isDone: boolean;

  @ManyToOne(() => User, (user)=> user.myTests,{nullable:true,onDelete:'CASCADE',onUpdate:'CASCADE'})
  user: User;

  @ManyToOne(()=>Course,(course)=>course.tests,{nullable:true,onDelete:'CASCADE',onUpdate:'CASCADE'})
  course:Course;
  
  @OneToMany(() => TestItem, (testItem) => testItem.test, { nullable: true,cascade:true })
  testItems: TestItem[];

  @OneToMany(()=>FeedBack,(feedback)=>feedback.test,{nullable:true,cascade:true})
  feedbacks:FeedBack[]
}
