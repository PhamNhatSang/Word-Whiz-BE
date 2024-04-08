import "reflect-metadata";
import { BaseModel } from "./base-model";
export default class GroupDetail extends BaseModel<GroupDetail> {
    group_id: number;
    student_id: number;
    course_id: number;
}
