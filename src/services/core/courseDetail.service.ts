import { Repository } from "typeorm";
import Course from "../../models/course.model";
import Word from "../../models/word.model";
import { BaseService } from "../base/base.service";
import { database } from "../../database";
import User from "../../models/user.model";
import CourseRate from "../../models/courseRate.model";
export default class CourseDetailService extends BaseService {
    constructor() {
        super();
    }
    
    async getCourseDetail(userId:number,courseId: number) {
        const course = await this.manager.findOne(Course,{
        where: { id: courseId },
        relations: { owner: true, words: true },
        });
       
        const user = await this.manager.findOne(User,{
        where: { id: userId },
        relations: ["myCourses", "courseImports"],
        });
        const courseRate = await this.manager.findOne(CourseRate,{where:{course:{id:courseId},user:{id:userId}}});
        
        const isInLibrary = user.courseImports.some((courseImport) => courseImport.id === courseId)||user.myCourses.some((myCourse) => myCourse.id === courseId);
        const courseDetail = {...course,owner_id:course.owner.id,isInLibrary:isInLibrary,rate:courseRate?.rate};
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

    async rateCourse(userId: number, courseId: number, rate: number) {
        const courseRate = await this.manager.findOne(CourseRate,{where:{course:{id:courseId},user:{id:userId}}});
        if(courseRate){
            courseRate.rate = rate;
            await this.manager.getRepository(CourseRate).save(courseRate);
        }else{
            const course = await this.manager.findOne(Course,{
                where: { id: courseId },
            });
            const user = await this.manager.findOne(User,{
                where: { id: userId },
            });
            const courseRate = new CourseRate();
            courseRate.course = course;
            courseRate.user = user;
            courseRate.rate = rate;
            await this.manager.getRepository(CourseRate).save(courseRate);
        }
    }

   
    

}
