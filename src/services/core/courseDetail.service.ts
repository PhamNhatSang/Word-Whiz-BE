import { Repository } from "typeorm";
import Course from "../../models/course.model";
import Word from "../../models/word.model";
import { BaseService } from "../base/base.service";
import { database } from "../../database";
import User from "../../models/user.model";
export default class CourseDetailService extends BaseService {
    constructor() {
        super();
    }
    
    async getCourseDetail(userId:number,courseId: number) {
        const course = await this.manager.findOne(Course,{
        where: { id: courseId },
        relations: ["words",'owner'],
        });
       
        const user = await this.manager.findOne(User,{
        where: { id: userId },
        relations: ["myCourses", "courseImports"],
        });
        
        const isInLibrary = user.courseImports.some((courseImport) => courseImport.id === courseId)||user.myCourses.some((myCourse) => myCourse.id === courseId);
        const courseDetail = {...course,owner_id:course.owner.id,isInLibrary:isInLibrary};
        delete courseDetail.owner; 
        return courseDetail;
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
    async updateCourse(course: Course) {
        const courseUpdate=  await this.manager.getRepository(Course).save(course);
        const orphanedWords = await this.manager.createQueryBuilder(Word, 'word')
      .leftJoinAndSelect('word.course', 'course')
      .where('word.courseId IS NULL')
      .getMany();
      if (orphanedWords.length > 0) 
        await this.manager.remove(orphanedWords);

        return courseUpdate;
    }

   
    

}
