import "reflect-metadata";

import { BaseModel } from "./base-model";
import Group from "./group.model";
import User from "./user.model";
import Course from "./course.model";
import { Entity, ManyToOne } from "typeorm";
@Entity({ name: "group_details" })
export default class GroupDetail extends BaseModel {
  @ManyToOne(() => Group, (group) => group.groupDetails)
  group: Group;

  @ManyToOne(() => User, (user) => user.groupDetails,{nullable:true})
  student: User;

  @ManyToOne(() => Course, (course) => course.groupDetails,{nullable:true})
  course: Course;
}
