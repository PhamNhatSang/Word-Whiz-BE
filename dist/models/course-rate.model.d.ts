import "reflect-metadata";
import { BaseModel } from "./base-model";
export default class CourseRate extends BaseModel<CourseRate> {
    course_id: number;
    user_id: number;
    rate: number;
}
