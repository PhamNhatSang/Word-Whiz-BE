import "reflect-metadata";

import { BaseModel } from "./baseModel";
import User from "./user.model";
import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, BeforeInsert } from "typeorm";
import Course from "./course.model";
import { join } from "path";

@Entity()
export default class Group extends BaseModel {
  @Column({nullable: true,name:"group_name"})
  groupName: string;

  @Column({nullable: true,name:"group_description"})

  groupDescription: string;

  @Column({nullable: true,name:"group_code"})
  code: string;

  @ManyToOne(() => User, (user) => user.myGroups)
  owner: User;

  @ManyToMany(() => User, (user) => user.addedGroups ,{nullable:true,cascade:true})
  @JoinTable({
    name: "group_students",
    joinColumn: {
      name: "group_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
  })
  students: User[];

  @ManyToMany(() => Course, (cousre) => cousre.addedGroups,{nullable:true,cascade:true})
  @JoinTable({
    name: "group_courses",
    joinColumn: {
      name: "group_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "course_id",
      referencedColumnName: "id",
    },
  })
  courses: Course[];


  @BeforeInsert()
  generateCode() {
    this.code = this.generateRandomString(8);
  }

  private generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return '#'+result;
  }
}
