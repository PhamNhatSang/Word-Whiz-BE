import "reflect-metadata";
import { BaseModel } from "./base-model";
import Course from "./course.model";
import TestItem from "./test-item.model";
export default class Test extends BaseModel<Test> {
    course_id: number;
    course: Course;
    test_items: TestItem[];
    score: number;
    is_first_done: boolean;
}
