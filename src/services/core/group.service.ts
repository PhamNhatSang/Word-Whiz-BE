import { BaseService } from "../base/base.service";
import Group from "../../models/group.model";
import { In } from "typeorm";
import User from "../../models/user.model";
import ExistData from "../../exceptions/ExistData";
import Course from "../../models/course.model";
import { getObjectSignedUrl } from "../../s3";
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
        const imageUrl = await getObjectSignedUrl(group?.owner_avatar as string);
        group.owner_avatar = imageUrl;
        return group;
      })
      const groupData = await Promise.all(groupPromises);
    return groupData;
  }
  async getGroupDetail(groupId: number) {
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

      const onwerGroupAvatar = await getObjectSignedUrl(groupDetail?.owner_avatar as string);
      groupDetail.owner_avatar = onwerGroupAvatar;
    const course = await this.manager
      .createQueryBuilder(Course, "course")
      .leftJoinAndSelect("course.owner", "owner")
      .leftJoinAndSelect("course.addedGroups", "groups")
      .leftJoin("course.words", "words")
      .select([
        "course.id",
        "groups.id",
        "course.title as title",
        "course.description as description",
        "course.accessiblity as accessiblity",
        "owner.id",
        "owner.name",
        "owner.avatar",
      ])
      .addSelect("COUNT(words.id)", "terms")
      .groupBy("course.id, owner.id,groups.id")
      .where("groups.id = :groupId", { groupId: groupId })
      .getRawMany();

      const coursePromises = course.map(async (course) => {
        const imageUrl = await getObjectSignedUrl(course?.owner_avatar as string);
        course.owner_avatar = imageUrl;
        return course;
      }
      )
      const courseData = await Promise.all(coursePromises);


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
      
      const studentPromises = students.map(async (student) => {
        const imageUrl = await getObjectSignedUrl(student?.student_avatar as string);
        student.student_avatar = imageUrl;
        return student;
      }
      )
      const studentData = await Promise.all(studentPromises);

    return { ...groupDetail, courses: courseData,students:studentData };
  }

  async createGroup(userId: number, group: Group) {
    const user = await this.manager.findOne(User, {
      where: { id: userId },
      relations: ["myGroups"],
    });
    user.myGroups.push(group);
    await this.manager.save(user);
    group.owner = user;
    await this.manager.getRepository(Group).save(group);
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
      
     return userToAdd.map((student) => {
      return {student_email:student.email, student_name: student.name, student_avatar: student.avatar}; })

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
      "course.accessiblity as accessiblity",
      "owner.id",
      "owner.name",
      "owner.avatar",
    ])
    .addSelect("COUNT(words.id)", "terms")
    .where("course.id = :courseId", { courseId: courseId })
    .groupBy("course.id, owner.id")
    .getRawOne();
     const onwerCourseAvatar = await getObjectSignedUrl(addCourse?.owner_avatar as string);
      addCourse.owner_avatar = onwerCourseAvatar;
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
