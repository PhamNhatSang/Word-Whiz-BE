import { Repository } from "typeorm";
import Course from "../../models/course.model";
import Word from "../../models/word.model";
import { BaseService } from "../base/base.service";
import { database } from "../../database";
export default class CourseDetailService extends BaseService {
    constructor() {
        super();
    }
    
    async getCourseDetail(courseId: number) {
        const course = await this.manager.findOne(Course,{
        where: { id: courseId },
        relations: ["words"],
        });
        return course;
    }

    async createWord(courseId: number, words: Word[]) {
        console.log(words);
        const course = await this.manager.findOne(Course,{
        where: { id: courseId },
        });
        
        const wordCreates = await this.manager.getRepository(Word).save(words);

        course.words = wordCreates;
        await this.manager.getRepository(Course).save(course);
    }
    
    

}
