import { BaseService } from "../base/base.service";
import Group from "../../models/group.model";
import { In, Repository } from "typeorm";
import User from "../../models/user.model";
import { database } from "../../database";
import ExistData from "../../exceptions/ExistData";
import Course from "../../models/course.model";
export default class GroupService extends BaseService {
    constructor() {
        super();
    }

    async getAllGroup(userId: number) {
        const groups = await this.manager.createQueryBuilder(Group, 'group')
        .leftJoinAndSelect('group.owner', 'owner')
        .leftJoinAndSelect('group.students', 'student')
        .leftJoinAndSelect('group.courses', 'course')
        .leftJoin(User, 'user', 'user.id = :userId', { userId })
        .where('owner.id = :userId', { userId })
        .orWhere('student.id = :userId', { userId })
        .select([
          'group.id',
          'group.groupName AS group_name',
          'group.description AS description',
          'group.code AS code',
          'owner.name',
          'owner.avatar',
          'COUNT(DISTINCT course.id) AS numberOfCourses',
          'COUNT(DISTINCT student.id) AS numberOfMembers'
        ])
        .groupBy('group.id')
        .addGroupBy('owner.id')
        .getRawMany();
        return groups
    }
    async getCourseInGroup(groupId: number) {

      const course=  await this.manager
      .createQueryBuilder(Course, "course")
      .leftJoinAndSelect("course.owner", "owner")
      .leftJoinAndSelect("course.addedGroups","groups")
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
      .groupBy("course.id, owner.id,groups.id")
      .where("groups.id = :groupId", { groupId: groupId })
      .getRawMany();
      return course;
        
    }

    async createGroup(userId: number, group: Group) {
        const user = await this.manager.findOne(User,{
            where: { id: userId },
            relations: ["myGroups"],
        });
        user.myGroups.push(group);
        await this.manager.save(user);
        group.owner = user;
        console.log(group);
        return await this.manager.getRepository(Group).save(group);
    }
    async  deleteGroup(userId:number,groupId:number): Promise<void> {
        const user = await this.manager.findOne(User,{
            where: { id: userId },
            relations: ["myGroups"],
        });
        user.myGroups = user.myGroups.filter(
            (group) => group.id !== groupId
        );
        await this.manager.delete(Group,groupId);
        await this.manager.save(user);
        
    }

    async addStudent(groupId: number, email: string[]) {
        const group = await this.manager.findOne(Group,{
            where: { id: groupId },
            relations: ["students"],
        });
        const user = await this.manager.find(User,{
            where: { email:In(email) },
        });
        const userToAdd = user.filter(user => !group.students.some(student => student.email === user.email));
        if(userToAdd.length === 0){
            throw new ExistData("All Student is already in group");
        }
        group.students.push(...userToAdd);
      
        return await this.manager.save(group);
      

    }

    async removeStudent(groupId: number, email: string) {
        const group = await this.manager.findOne(Group,{
            where: { id: groupId },
            relations: ["students"],
        });
        group.students = group.students.filter(
            (student) => student.email !== email
        );

        
        return await this.manager.getRepository(Group).save(group);
    }

    async findStudent(email: string) {
        const student = await this.manager.findOne(User,{
            where: { email },
        });
        return {email:student.email,name:student.name};
    }

    async addCourseToGroup(groupId: number,userId:number, courseId: number) {
        const group = await this.manager.findOne(Group,{
            where: { id: groupId },
            relations: ["courses"],
        });
        const user = await this.manager.findOne(User,{
            where: { id: userId },
            relations: ["myCourses"],
        });
        
        const course = user.myCourses.find((course) => course.id === courseId);
        if(!course){
            throw new ExistData("Course is not exist in your list");
        }
        if(group.courses.find((course) => course.id === courseId)){
            throw new ExistData("Course is already in group");
        }
        group.courses.push(course);
        await this.manager.save(group);

    }

    async removeCourseFromGroup(groupId: number, courseId: number) {
        const group = await this.manager.findOne(Group,{
            where: { id: groupId },
            relations: ["courses"],
        });
        group.courses = group.courses.filter(
            (course) => course.id !== courseId
        );
     

       return await this.manager.save(group);
    }

    

}