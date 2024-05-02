import { BaseService } from "../base/base.service";
import Group from "../../models/group.model";
import { In, Repository } from "typeorm";
import User from "../../models/user.model";
import { database } from "../../database";
import ExistData from "../../exceptions/ExistData";
export default class GroupService extends BaseService<Group> {
    protected userRepository: Repository<User>;
    constructor() {
        super(Group);
        this.userRepository = database.getRepository(User);
    }

    async getAllGroup(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["myGroups","addedGroups"],
        });
        const groupAll = user.myGroups.concat(user.addedGroups);
        return groupAll
    }

    async createGroup(userId: number, group: Group) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["myGroups"],
        });
        user.myGroups.push(group);
        await this.userRepository.save(user);
    }
    async  deleteGroup(userId:number,groupId:number): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["myGroups"],
        });
        user.myGroups = user.myGroups.filter(
            (group) => group.id !== groupId
        );
        await this.repository.delete(groupId);
        await this.userRepository.save(user);
        
    }

    async addStudent(groupId: number, email: string[]) {
        const group = await this.repository.findOne({
            where: { id: groupId },
            relations: ["students"],
        });
        const user = await this.userRepository.findOne({
            where: { email:In(email) },
        });
        group.students.push(user);
        return await this.repository.save(group);

    }

    async removeStudent(groupId: number, email: string[]) {
        const group = await this.repository.findOne({
            where: { id: groupId },
            relations: ["students"],
        });
        const user = await this.userRepository.findOne({
            where: { email:In(email) },
        });
        group.students = group.students.filter(
            (student) => !email.includes(student.email)
        );
        await this.repository.save(group);
    }

    async findStudent(email: string) {
        const student = await this.userRepository.findOne({
            where: { email },
        });
        return {email:student.email,name:student.name};
    }

    async addCourseToGroup(groupId: number,userId:number, courseId: number) {
        const group = await this.repository.findOne({
            where: { id: groupId },
            relations: ["courses"],
        });
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["myCourses"],
        });
        const course = user.myCourses.find((course) => course.id === courseId);
        if(group.courses.find((course) => course.id === courseId)){
            throw new ExistData("Course is already in group");
        }
        group.courses.push(course);
        group.students.forEach((student) => {student.courseImports.push(course); this.userRepository.save(student)});
        await this.repository.save(group);
    }

    async removeCourseFromGroup(groupId: number, courseId: number) {
        const group = await this.repository.findOne({
            where: { id: groupId },
            relations: ["courses"],
        });
        group.courses = group.courses.filter(
            (course) => course.id !== courseId
        );
       return await this.repository.save(group);
    }

    

}