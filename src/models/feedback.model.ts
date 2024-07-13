import "reflect-metadata";

import { BaseModel } from "./baseModel";
import User from "./user.model";
import Course from "./course.model";
import { Entity, Column, ManyToOne, Check } from "typeorm";
import Test from "./test.model";
@Entity()
export default class FeedBack extends BaseModel {

   
    
    @ManyToOne(() => User, (user) => user.feedbacks,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    user: User;
    
    @Column({type:'text'})
    content: string;

    @ManyToOne(()=>Test, (test)=>test.feedbacks,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    test: Test;
    
   
}
