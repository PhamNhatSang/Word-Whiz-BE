import { BaseService } from "../base/base.service";
import Group from "../../models/group.model";
import { In } from "typeorm";
import User from "../../models/user.model";
import ExistData from "../../exceptions/ExistData";
import Course from "../../models/course.model";
import { getObjectSignedUrl } from "../../s3";
import { generateRandomCode } from "../../utils/shuffle";
import TestGroup from "../../models/testGroup.model";
import test from "node:test";
import Test from "../../models/test.model";
import TestItem from "../../models/testItem.model";
export default class GroupService extends BaseService {
  constructor() {
    super();
  }

  async getAllGroup(userId: number) {
    const groups = await this.manager
      .createQueryBuilder(Group, "group")
      .leftJoinAndSelect("group.owner", "owner")
      .leftJoinAndSelect("group.students", "student")
      .leftJoinAndSelect("group.courses", "course")
      .leftJoin(User, "user", "user.id = :userId", { userId })
      .where("owner.id = :userId", { userId })
      .orWhere("student.id = :userId", { userId })
      .select([
        "group.id",
        "group.groupName AS group_name",
        "group.groupDescription AS description",
        "group.code AS code",
        "owner.name",
        "owner.avatar",
        "COUNT(DISTINCT course.id) AS numberOfCourses",
        "COUNT(DISTINCT student.id) AS numberOfMembers",
      ])
      .groupBy("group.id")
      .addGroupBy("owner.id")
      .getRawMany();

      const groupPromises = groups.map(async (group) => {
        if(group.owner_avatar)
        group.owner_avatar = await getObjectSignedUrl(group?.owner_avatar as string);
        return group;
      })
      const groupData = await Promise.all(groupPromises);
    return groupData;
  }
  async getGroupDetail(userId: number, groupId: number) {
    const user = await this.manager.findOne(User, {
      where: { id: userId },
      relations: ["myGroups", "addedGroups"],
    });
  
    const group = await this.manager.findOne(Group, { where: { id: groupId } });
  
    if (!group) {
      throw new ExistData("Group does not exist");
    }
  
    const isGroupMember =
      user.myGroups.some((group) => group.id === groupId) ||
      user.addedGroups.some((group) => group.id === groupId);
  
    if (!isGroupMember) {
      throw new Error("Group is not in your list");
    }
  
    const groupDetail = await this.manager
      .createQueryBuilder(Group, "group")
      .leftJoinAndSelect("group.owner", "owner")
      .select([
        "group.id",
        "owner.id",
        "group.groupName AS group_name",
        "owner.name",
        "owner.avatar",
        "group.groupDescription AS description",
        "group.code AS code",
      ])
      .where("group.id = :groupId", { groupId })
      .getRawOne();
  
    if (groupDetail?.owner_avatar) {
      groupDetail.owner_avatar = await getObjectSignedUrl(groupDetail.owner_avatar);
    }
  
    const courses = await this.manager
      .createQueryBuilder(Course, "course")
      .leftJoinAndSelect("course.owner", "owner")
      .leftJoinAndSelect("course.addedGroups", "groups")
      .leftJoin("course.words", "words")
      .select([
        "course.id",
        "groups.id",
        "course.title as title",
        "course.language as language",
        "course.description as description",
        "course.accessiblity as accessiblity",
        "owner.id",
        "owner.name",
        "owner.avatar",
      ])
      .addSelect("COUNT(words.id)", "terms")
      .groupBy("course.id, owner.id, groups.id")
      .where("groups.id = :groupId", { groupId })
      .getRawMany();
  
    const courseData = await Promise.all(
      courses.map(async (course) => {
        if (course.owner_avatar) {
          course.owner_avatar = await getObjectSignedUrl(course.owner_avatar);
        }
        return course;
      })
    );
  
    const students = await this.manager
      .createQueryBuilder(User, "user")
      .leftJoinAndSelect("user.addedGroups", "group")
      .where("group.id = :groupId", { groupId })
      .select([
        "user.email as student_email",
        "user.name as student_name",
        "user.avatar as student_avatar",
      ])
      .getRawMany();
  
    const studentData = await Promise.all(
      students.map(async (student) => {
        if (student.student_avatar) {
          student.student_avatar = await getObjectSignedUrl(student.student_avatar);
        }
        return student;
      })
    );
  
    return {
      ...groupDetail,
      courses: courseData,
      students: studentData,
    };
  }
  

  async createGroup(userId: number, group: Group) {
    const user = await this.manager.findOne(User, {
      where: { id: userId },
      relations: ["myGroups"],
    });
    group.owner = user;
   const groupCreate= await this.manager.getRepository(Group).save(group);
   groupCreate.code = "#"+generateRandomCode(7,groupCreate.id);
    await this.manager.getRepository(Group).save(groupCreate);
  }
  async deleteGroup(userId: number, groupId: number): Promise<void> {
    const user = await this.manager.findOne(User, {
      where: { id: userId },
      relations: ["myGroups"],
    });
    user.myGroups = user.myGroups.filter((group) => group.id !== groupId);
    await this.manager.delete(Group, groupId);
  }

  async addStudent(groupId: number, email: string[]) {
    const group = await this.manager.findOne(Group, {
      where: { id: groupId },
      relations: ["students"],
    });
    const user = await this.manager.find(User, {
      where: { email: In(email) },
    });
    const userToAdd = user.filter(
      (user) => !group.students.some((student) => student.email === user.email)
    );
    if (userToAdd.length === 0) {
      throw new ExistData("All Student is already in group");
    }
    group.students.push(...userToAdd);

     await this.manager.save(group);
      
    const  userDataToAdd= userToAdd.map( async (student) => {
      if(student.avatar)
      student.avatar = await getObjectSignedUrl(student.avatar);
      return {student_email:student.email, student_name: student.name, student_avatar: student.avatar}; })


      const testGroups = await this.manager.find(TestGroup, {
        where: { group: {id:groupId} },
        relations: {tests:{user:true, testItems:true, course:true}},
      });
      
      for (const testGroup of testGroups) {
        for (const student of userToAdd) {
          if (testGroup.tests.length === 1 && testGroup.tests[0].user === null) {
            testGroup.tests[0].user = student;
            try {
              await this.manager.getRepository(TestGroup).save(testGroup);
            } catch (error) {
              console.error('Error saving testGroup:', error);
            }
          } else {
            console.log('Creating new test for student:');
            const test = new Test();
            const newTestItems = testGroup.tests[0].testItems.map((testItem) => {
              const newTestItemData = new TestItem();
              newTestItemData.option_1 = testItem.option_1;
              newTestItemData.option_2 = testItem.option_2;
              newTestItemData.option_3 = testItem.option_3;
              newTestItemData.option_4 = testItem.option_4;
              newTestItemData.user_answer = "";
              newTestItemData.word = testItem.word;
              return newTestItemData;
            });


      
            test.testItems = newTestItems;
            test.user = student;
            test.course = testGroup.tests[0].course;
            test.testGroup = testGroup;
      
            try {
              await this.manager.getRepository(Test).save(test);
            } catch (error) {
              console.error('Error saving test:', error);
            }
          }
        }
      }
      
    const userDataReturn = await Promise.all(userDataToAdd);
    return userDataReturn;

  }

  async removeStudent(groupId: number, email: string) {
    const group = await this.manager.findOne(Group, {
      where: { id: groupId },
      relations: ["students"],
    });
    group.students = group.students.filter(
      (student) => student.email !== email
    );

     await this.manager.getRepository(Group).save(group);


     return {email:email};
  }

  async findStudent(email: string) {
    const student = await this.manager.findOne(User, {
      where: { email },
    });
    return { email: student.email, name: student.name };
  }

  async addCourseToGroup(groupId: number, userId: number, courseId: number) {
    const group = await this.manager.findOne(Group, {
      where: { id: groupId },
      relations: ["courses"],
    });
    const user = await this.manager.findOne(User, {
      where: { id: userId },
      relations: ["myCourses"],
    });

    const course = user.myCourses.find((course) => course.id === courseId);
    if (!course) {
      throw new ExistData("Course is not exist in your list");
    }
    if (group.courses.find((course) => course.id === courseId)) {
      throw new ExistData("Course is already in group");
    }
    group.courses.push(course);
    await this.manager.save(group);

    const addCourse = await this.manager.createQueryBuilder(Course, "course")
    .leftJoinAndSelect("course.owner", "owner")
    .leftJoin("course.words", "words")
    .select([
      "course.id",
      "course.title as title",
      "course.description as description",
      "course.language as language",
      "course.accessiblity as accessiblity",
      "owner.id",
      "owner.name",
      "owner.avatar",
    ])
    .addSelect("COUNT(words.id)", "terms")
    .where("course.id = :courseId", { courseId: courseId })
    .groupBy("course.id, owner.id")
    .getRawOne();
    if(addCourse.owner_avatar)
      addCourse.owner_avatar= await getObjectSignedUrl(addCourse?.owner_avatar as string);
    return addCourse;
    
  }

  async removeCourseFromGroup(groupId: number, courseId: number) {
    const group = await this.manager.findOne(Group, {
      where: { id: groupId },
      relations: ["courses"],
    });
    group.courses = group.courses.filter((course) => course.id !== courseId);

    await this.manager.save(group);
    return {courseId:courseId};
  }
}
