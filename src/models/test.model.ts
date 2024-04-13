import "reflect-metadata";
import { BaseModel } from "./base-model";
import TestItem from "./test-item.model";
import { Entity, Column, OneToMany } from "typeorm";
@Entity({ name: "tests"})
export default class Test extends BaseModel {
  
  @Column()
  score: number;

  @Column({ type: "boolean",default:false} )
  is_first_done: boolean;

  @OneToMany(() => TestItem, (testItem) => testItem.test, { nullable: true })
  testItems: TestItem[];
}
