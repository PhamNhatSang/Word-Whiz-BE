import { BaseService } from "../base/base.service";
import Course from "../../models/course.model";
import User from "../../models/user.model";
import { Repository } from "typeorm";
import { database } from "../../database";
import Learning from "../../models/learning.model";
import Word from "../../models/word.model";
import Group from "../../models/group.model";
import { isIn } from "class-validator";
import { getObjectSignedUrl } from "../../s3";
export default class LibraryService extends BaseService {
  constructor() {
    super();
  }

  getAllCourse = async (userId: number) => {
    const myCourses = await this.manager
      .createQueryBuilder(Course, "course")
      .leftJoinAndSelect("course.owner", "owner")
      .leftJoin("course.words", "words")
      .select([
        "course.id",
        "course.title as title",
        "course.description as description",
        "course.accessiblity as accessiblity",
        "owner.id",
        "owner.name",
        "owner.avatar",
      ])
      .addSelect("COUNT(words.id)", "terms")
      .where("owner.id = :userId", { userId: userId })
      .groupBy("course.id, owner.id")
      .getRawMany();
      const myCoursePromises = myCourses.map(async (course) => {
        const imageUrl = await getObjectSignedUrl(course?.owner_avatar as string);
        course.owner_avatar = imageUrl;
        return course;
      }
      )
      const myCourseData = await Promise.all(myCoursePromises);


    const importCourses = await this.manager
      .createQueryBuilder(Course, "course")
      .leftJoinAndSelect("course.owner", "owner")
      .leftJoin("course.words", "words")
      .innerJoin("course.userImporteds", "userImporteds")
      .select([
        "course.id",
        "course.title as title",
        "course.description as description",
        "course.accessiblity as accessiblity",
        "owner.id",
        "owner.name",
        "owner.avatar",
      ])
      .addSelect("COUNT(words.id)", "terms")
      .where("userImporteds.id = :userId", { userId: userId })
      .groupBy("course.id, owner.id")
      .getRawMany();
      const importCoursePromises = importCourses.map(async (course) => {
        const imageUrl = await getObjectSignedUrl(course?.owner_avatar as string);
        course.owner_avatar = imageUrl;
        return course;
      }
      )
      const importCourseData = await Promise.all(importCoursePromises);

    return { myCourses:myCourseData,importCourses:importCourseData };
  };

  createCourse = async (userId: number, course: Course) => {
    const user = await this.manager.findOne(User, {
      where: { id: userId },
      relations: ["myCourses", "learnings"],
    });
    course.owner = user;

    await this.manager.getRepository(Course).save(course);
  };

  getCourseByTitle = async (userId: number, title: string) => {
    const user = await this.manager.findOne(User, {
      where: { id: userId },
      relations: ["myCourses, courseImports"],
    });
    if (title === "")
      return {
        myCourseTitle: user.myCourses,
        courseImportTitle: user.courseImports,
      };
    const myCourseTitle = user.myCourses.find(
      (course) => course.title === title
    );
    const courseImportTitle = user.courseImports.find(
      (course) => course.title === title
    );
    return { myCourseTitle, courseImportTitle };
  };

  deleteCourse = async (userId: number, courseId: number) => {
    const user = await this.manager.findOne(User, {
      where: { id: userId },
      relations: ["myCourses"],
    });
    if (user.myCourses.find((course) => course.id === courseId)) {
      await this.manager.delete(Course, courseId);
      return courseId;
    }

    if (user.courseImports.find((course) => course.id === courseId)) {
      user.courseImports = user.courseImports.filter(
        (course) => course.id !== courseId
      );
      await this.manager.save(user);
      return courseId;
    }

    throw new Error("Course not found");
  };

  getListCourseToAddGroup = async (userId: number, groupId: number) => {
    const user = await this.manager.findOne(User, {
      
      where: { id: userId },
      relations: ["myCourses"],
    });
    const group = await this.manager.findOne(Group, {
      where: { id: groupId },
      relations: ["courses"],
    });

    const courseToAdd = user.myCourses.map((course) => {
      var isAdded = false;
      if (group.courses.find((courseGroup) => courseGroup.id === course.id)) {
        isAdded = true;
      }
      return {
        courseName: course.title,
        courseId: course.id,
        isAdded: isAdded,
      };
    });

    return courseToAdd;
  };

  getListCourseToAddPost = async (userId: number) => {
    const user = await this.manager.findOne(User, {
      where: { id: userId },
      relations: ["myCourses"],
    });

    const courseToAdd = user.myCourses.map((course) => {
    
      return {
        courseName: course.title,
        courseId: course.id,
        isInPost: false,
      };
    });

    return courseToAdd;

  }



}
