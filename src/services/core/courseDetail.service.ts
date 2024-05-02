import Course from "../../models/course.model";
import Word from "../../models/word.model";
import { BaseService } from "../base/base.service";
export default class CourseDetailService extends BaseService<Course> {
    constructor() {
        super(Course);
    }
    
    async getCourseDetail(courseId: number) {
        const course = await this.repository.findOne({
        where: { id: courseId },
        relations: ["words"],
        });
        return course;
    }

    async createWord(courseId: number, word: Word) {
        const course = await this.repository.findOne({
        where: { id: courseId },
        relations: ["words"],
        });
        course.words.push(word);
        return word;
    }
    
    async deleteWord(courseId: number, wordId: number) {
        const course = await this.repository.findOne({
        where: { id: courseId },
        relations: ["words"],
        });
        course.words = course.words.filter((word) => word.id !== wordId);
        await this.repository.save(course);
        return wordId;
    }
    async updateWord(courseId: number, word: Word) {
        const course = await this.repository.findOne({
        where: { id: courseId },
        relations: ["words"],
        });
        const index = course.words.findIndex((w) => w.id === word.id);
        course.words[index] = word;
        await this.repository.save(course);
        return word;
    }

}
