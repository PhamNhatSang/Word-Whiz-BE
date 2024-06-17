import "reflect-metadata";

import Test from "./test.model";
import { Entity, Column, ManyToOne } from "typeorm";
import { BaseModel } from "./baseModel";
import Word from "./word.model";
@Entity()
export default class TestItem extends BaseModel {
  
  
  @ManyToOne(() => Word, (word) => word.testItems,{onDelete:'CASCADE',onUpdate:'CASCADE'})
  word: Word;
  
  @Column({ type: "text" })
  option_1: string;

  @Column({ type: "text" })
  option_2: string;

  @Column({ type: "text" })
  option_3: string;

  @Column({ type: "text" })
  option_4: string;

 

  @Column({ type: "text" ,name:'user_answer',nullable:true,default:''})
  user_answer: string;
  
  @ManyToOne(() => Test, (test) => test.testItems,{onDelete:'CASCADE',onUpdate:'CASCADE'})
  test: Test;

}
