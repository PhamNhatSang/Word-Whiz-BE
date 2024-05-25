import { BaseService } from "../base/base.service";
import Course from "../../models/course.model";
import User from "../../models/user.model";
import { Repository } from "typeorm";
import { database } from "../../database";
import Learning from "../../models/learning.model";
import Word from "../../models/word.model";
import Group from "../../models/group.model";
export default class LibraryService extends BaseService {
  
  constructor() {
    super();
  }

  getAllCourse = async (userId: number) => {
    const user = await this.manager.findOne(User,{
      where: { id: userId },
      relations: ["myCourses","courseImports"],
    });
    
    const courseAll = user.myCourses.concat(user.courseImports);
    return courseAll;
  };

  createCourse = async (userId: number, course: Course) => {
    const user = await this.manager.findOne(User,{
      where: { id: userId },
      relations: ["myCourses","learnings"],
    });
    course.owner = user;
   
   await this.manager.getRepository(Course).save(course);
   

  };
   
  getCourseByTitle = async (userId: number, title: string) => {
    const user = await this.manager.findOne(User,{
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
    const user = await this.manager.findOne(User,{
      where: { id: userId },
      relations: ["myCourses"],
    });
   if(user.myCourses.find((course) => course.id === courseId)){
      await this.manager.delete(Course,courseId);
      return courseId
     
  }

  if(user.courseImports.find((course) => course.id === courseId)){
    user.courseImports = user.courseImports.filter((course) => course.id !== courseId);
    await this.manager.save(user);
    return courseId
   
  }

  throw new Error("Course not found");
     
  }

  getListCourseToAddGroup = async (userId: number, groupId: number) => {
      
    const user = await this.manager.findOne(User,{
      where: { id: userId },
      relations: ["myCourses"],
    });
    const group = await this.manager.findOne(Group,{
      where: { id: groupId },
      relations: ["courses"],
    });

    const courseToAdd = user.myCourses.map(
      (course) => {
        var isAdded=false;
        if (group.courses.find((courseGroup) => courseGroup.id === course.id)) {
          isAdded=true;
        }
        return {"courseName":course.title,"courseId":course.id,"isAdded":isAdded};
      }
    );

    return courseToAdd; 
   
  }
 

  
}
