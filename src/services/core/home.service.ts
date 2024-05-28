import { manager } from "./../../database";
import Course from "../../models/course.model";
import User from "../../models/user.model";
import { Like, Repository } from "typeorm";
import { database } from "../../database";
import { BaseService } from "../base/base.service";
import { Accessiblity } from "../../enum/Accessiblity";
import ExistData from "../../exceptions/ExistData";
import Learning from "../../models/learning.model";
export default class HomeService extends BaseService {
  constructor() {
    super();
  }
  getCourseByTitle = async (title: string) => {
    const course = await this.manager.find(Course, {
      where: { title: Like(`%${title}%`), accessiblity: Accessiblity.PUBLIC },
    });

    return course;
  };

  getTopCourse = async () => {
    const course = await this.manager
      .createQueryBuilder(Course, "course")
      .leftJoin("course.courseRate", "courseRate") // Assuming you have a courseRates relationship
      .leftJoinAndSelect("course.owner", "owner")
      .leftJoin("course.words", "word") // Join with words relation

      .select([
        "course.id",
        "course.title as title", // Add other course fields as needed
        "course.accessiblity as accessiblity",
        "owner.id", // Select owner fields
        "owner.name",
        "owner.email",
        "owner.avatar",
      ])
      .where("course.accessiblity = :accessiblity", {
        accessiblity: Accessiblity.PUBLIC,
      })
      .addSelect("AVG(courseRate.rate)", "avgrate")
      .addSelect("COUNT(word.id)", "terms") // Count items in words relation and alias it as terms

      .groupBy("course.id, owner.id")
      .orderBy("avgrate", "DESC")

      .limit(5)
      .getRawMany();
    return course;
  };

  getNewCourse = async () => {
    const course = await this.manager
      .createQueryBuilder(Course, "course")
      .leftJoinAndSelect("course.owner", "owner")
      .leftJoin("course.words", "word") // Join with words relation

      .select([
        "course.id",
        "course.title as title", // Add other course fields as needed
        "course.accessiblity as accessiblity",
        "owner.id", // Select owner fields
        "owner.name",
        "owner.email",
        "owner.avatar",
      ])
      .where("course.accessiblity = :accessiblity", {
        accessiblity: Accessiblity.PUBLIC,
      })
      .addSelect("COUNT(word.id)", "terms")
      .addSelect("course.createdAt", "createdat") // Count items in words relation and alias it as terms
      .groupBy("course.id, owner.id")
      .orderBy("createdAt", "DESC")
      .limit(5)
      .getRawMany();
    return course;
  };

  importCourse = async (userId: number, courseId: number) => {
    const user = await this.manager.findOne(User, {
      where: { id: userId },
      relations: ["courseImports", "myCourses", "learnings"],
    });

    const course = await this.manager.findOne(Course, {
      where: { id: courseId },
    });
    if (
      user.courseImports.find((course) => course.id === courseId) ||
      user.myCourses.find((course) => course.id === courseId)
    ) {
      throw new ExistData("Course is already");
    }

    user.courseImports.push(course);

    await this.manager.getRepository(User).save(user);
   
  };

  getContinueCourse = async (userId: number) => {
    const course = await this.manager
    .createQueryBuilder(Course, 'course')
    .select([
      'course.id as courseId',
      'course.title as title',
      'owner.id as owner_id',
      'owner.name as owner_name',
      'owner.avatar as owner_avatar',
      'COUNT(word.id) as terms',
      'learning.lastWordIndex',
    ])
    .innerJoin('course.owner', 'owner')
    .leftJoin('course.words', 'word')
    .innerJoin('course.learnings', 'learning', 'learning.user.id = :learnerId', {learnerId: userId })
    .groupBy('course.id, owner.id, learning.lastWordIndex')
    .getRawMany();

    return course;

    }
}
