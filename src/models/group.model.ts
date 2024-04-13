import "reflect-metadata";

import { BaseModel } from "./base-model";
import User from "./user.model";
import GroupDetail from "./group-detail.model";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: "groups" })
export default class Group extends BaseModel {
  @Column({nullable: true})
  group_name: string;

  @Column({nullable: true})
  group_description: string;

  @ManyToOne(() => User, (user) => user.myGroups)
  owner: User;

  @OneToMany(() => GroupDetail, (groupDetail) => groupDetail.group, { nullable: true })
  groupDetails: GroupDetail[];
}
