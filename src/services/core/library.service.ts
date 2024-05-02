import { BaseService } from "../base/base.service";
import Course from "../../models/course.model";
import User from "../../models/user.model";
import { Repository } from "typeorm";
import { database } from "../../database";
export default class LibraryService extends BaseService<Course> {
  protected userRepository: Repository<User>;
  constructor() {
    super(Course);
    this.userRepository = database.getRepository(User);
  }

  createCourse = async (userId: number, course: Course) => {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["myCourses"],
    });
    user.myCourses.push(course);
    await this.userRepository.save(user);
  };
   
  getCourseByTitle = async (userId: number, title: string) => {
    const user = await this.userRepository.findOne({
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
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["myCourses", "courseImports"],
    });
    if (user.myCourses.find((course) => course.id === courseId)) {
      user.myCourses = user.myCourses.filter(
        (course) => course.id !== courseId
      );
      this.repository.delete(courseId);
    }

    if (user.courseImports.find((course) => course.id === courseId)) {
      user.courseImports = user.courseImports.filter(
        (course) => course.id !== courseId
      );
    }

    await this.userRepository.save(user);
  };

  
}
