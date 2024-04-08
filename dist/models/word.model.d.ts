import "reflect-metadata";
import { BaseModel } from "./base-model";
import Course from "./course.model";
export default class Word extends BaseModel<Word> {
    course_id: number;
    course: Course;
    term: string;
    definition: string;
    example: string;
    explanation: string;
    image: string;
}
