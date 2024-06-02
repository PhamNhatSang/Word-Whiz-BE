import "reflect-metadata";

import Test from "./test.model";
import { Entity, Column, ManyToOne } from "typeorm";
import { BaseModel } from "./baseModel";
@Entity()
export default class TestItem extends BaseModel {
  
  @Column({ type: "text" })
  question: string;

  @Column({ type: "text" })
  option_1: string;

  @Column({ type: "text" })
  option_2: string;

  @Column({ type: "text" })
  option_3: string;

  @Column({ type: "text" })
  option_4: string;

  @Column({ type: "text" ,name:'correct_answer'})
  correct_answer: string;


  @Column({ type: "text" ,name:'user_answer',nullable:true,default:''})
  user_answer: string;
  
  @ManyToOne(() => Test, (test) => test.testItems,{onDelete:'CASCADE',onUpdate:'CASCADE'})
  test: Test;

}
