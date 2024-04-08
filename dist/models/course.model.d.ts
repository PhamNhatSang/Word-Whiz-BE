import "reflect-metadata";
import { Accessiblity } from "../enum/Accessiblity";
import { BaseModel } from "./base-model";
import Group from "./group.model";
import User from "./user.model";
import Word from "./word.model";
import Test from "./test.model";
import CourseRate from "./course-rate.model";
export default class Course extends BaseModel<Course> {
    owner_id: number;
    owner: User;
    title: string;
    description: string;
    accessiblity: Accessiblity;
    is_creadted: boolean;
    words: Word[];
    test: Test;
    groups: Group[];
    userRates: Array<User & {
        CourseRate: CourseRate;
    }>;
}
