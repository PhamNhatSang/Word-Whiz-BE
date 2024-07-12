import "reflect-metadata";
import { BaseModel } from "./baseModel";
import TestItem from "./testItem.model";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import User from "./user.model";
import Course from "./course.model";
import Group from "./group.model";
import Test from "./test.model";
@Entity()
export default class TestGroup extends BaseModel {
    @Column({ type: "varchar", length: 255, name: "testName" ,nullable:true})
    testName: string;
  
  @ManyToOne(()=>Group,(group)=>group.testGroups,{nullable:true,onDelete:'CASCADE',onUpdate:'CASCADE'})
  group:Group;

  @OneToMany(()=>Test,(test)=>test.testGroup,{nullable:true,cascade:true})
  tests:Test[];
}
