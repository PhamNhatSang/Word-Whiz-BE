import "reflect-metadata";
import { BaseModel } from "./base-model";
import User from "./user.model";
import Course from "./course.model";
export default class Group extends BaseModel<Group> {
    group_name: string;
    group_description: string;
    owner_id: number;
    owner: User;
    students: User[];
    courses: Course[];
}
