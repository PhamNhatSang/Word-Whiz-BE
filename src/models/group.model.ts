import "reflect-metadata";

import { BaseModel } from "./baseModel";
import User from "./user.model";
import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import Course from "./course.model";
import { join } from "path";

@Entity()
export default class Group extends BaseModel {
  @Column({nullable: true})
  group_name: string;

  @Column({nullable: true})
  group_description: string;

  @ManyToOne(() => User, (user) => user.myGroups)
  owner: User;

  @ManyToMany(() => User, (user) => user.addedGroups)
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

  @ManyToMany(() => Course, (cousre) => cousre.addedGroups)
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
}
