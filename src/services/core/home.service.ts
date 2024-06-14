import Course from "../../models/course.model";
import User from "../../models/user.model";
import { Like } from "typeorm";
import { BaseService } from "../base/base.service";
import { Accessiblity } from "../../enum/Accessiblity";
import ExistData from "../../exceptions/ExistData";
import { getObjectSignedUrl } from "../../s3";
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
    const course = await this.manager.find(Course, {
      where: { accessiblity: Accessiblity.PUBLIC },
      relations: ["owner", "words", "courseRate"],
    });

    const coursePromises = course.map(async (course) => {
      let avgRate = 0;
      if (course.courseRate.length > 0)
        avgRate =
          course.courseRate.reduce((acc, rate) => acc + rate.rate, 0) /
          course.courseRate.length;

      const terms = course.words.length;
      const imageUrl = await getObjectSignedUrl(course.owner.avatar);

      return {
        course_id: course.id,
        title: course.title,
        owner_id: course.owner.id,
        owner_name: course.owner.name,
        owner_avatar: imageUrl,
        owner_email: course.owner.email,
        terms,
        avg_rate: avgRate,
      };
    });

    const courseData = await Promise.all(coursePromises);
    const courseResult =courseData.sort((a, b) => {
      return b.avg_rate - a.avg_rate;
    })
    return courseResult.slice(0, 5);
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

    const coursePromises = course.map(async (course) => {
      const imageUrl = await getObjectSignedUrl(course?.owner_avatar as string);
      course.owner_avatar = imageUrl;
      return course;
    });
    const courseData = await Promise.all(coursePromises);
    return courseData;
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
      .createQueryBuilder(Course, "course")
      .select([
        "course.id",
        "course.title as title",
        "owner.id as owner_id",
        "owner.name as owner_name",
        "owner.avatar as owner_avatar",
        "COUNT(word.id) as terms",
        "learning.lastWordIndex",
      ])
      .innerJoin("course.owner", "owner")
      .leftJoin("course.words", "word")
      .innerJoin(
        "course.learnings",
        "learning",
        "learning.user.id = :learnerId",
        { learnerId: userId }
      )
      .groupBy("course.id, owner.id, learning.lastWordIndex")
      .getRawMany();

    const coursePromises = course.map(async (course) => {
      const imageUrl = await getObjectSignedUrl(course?.owner_avatar as string);
      course.owner_avatar = imageUrl;
      return course;
    });
    const courseData = await Promise.all(coursePromises);
    return courseData;
  };
}
