import Course from "../../models/course.model";
import User from "../../models/user.model";
import { Like, Repository } from "typeorm";
import { database } from "../../database";
import { BaseService } from "../base/base.service";
import { Accessiblity } from "../../enum/Accessiblity";
import ExistData from "../../exceptions/ExistData";
export default class HomeService extends BaseService<Course>{
    protected userRepository: Repository<User>;
    constructor() {
        super(Course);
        this.userRepository = database.getRepository(User);
    }
    getCourseByTitle = async ( title: string) => {
        
        const course = await this.repository.find({
            where: { title:Like(`%${title}%`) ,accessiblity:Accessiblity.PUBLIC},
        });

        return course;
    }

    getTopCourse = async () => {
        const course = await this.repository.createQueryBuilder('course')
        .leftJoin('course.courseRates', 'courseRate') // Assuming you have a courseRates relationship
        .select('course')
        .where('course.accessiblity = :accessiblity', { accessiblity: Accessiblity.PUBLIC })
        .addSelect('AVG(courseRate.rate)', 'avgRate') // Select average rate as avgRate
        .groupBy('course.id')
        .orderBy('avgRate', 'DESC')
        .limit(5).getRawMany();
        return course;
    }

    getNewCourse = async () => {
        const course = await this.repository.find({
            where: { accessiblity: Accessiblity.PUBLIC },
            order: { createdAt: "DESC" },
            take: 5,
        });
        return course;
    }
    importCourse = async (userId: number, courseId: number) => {
        const user = await this.userRepository.findOne({
          where: { id: userId },
          relations: ["courseImports"],
        });
        const course = await this.repository.findOne({
          where: { id: courseId },
        });
        if (user.courseImports.find((course) => course.id === courseId)) {
          throw new ExistData("Course is already imported");
        }
        user.courseImports.push(course);
        await this.userRepository.save(user);
      };

}