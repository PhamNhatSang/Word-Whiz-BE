"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_service_1 = require("../base/base.service");
const group_model_1 = __importDefault(require("../../models/group.model"));
const typeorm_1 = require("typeorm");
const user_model_1 = __importDefault(require("../../models/user.model"));
const ExistData_1 = __importDefault(require("../../exceptions/ExistData"));
const course_model_1 = __importDefault(require("../../models/course.model"));
const s3_1 = require("../../s3");
const shuffle_1 = require("../../utils/shuffle");
class GroupService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getAllGroup(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = yield this.manager
                .createQueryBuilder(group_model_1.default, "group")
                .leftJoinAndSelect("group.owner", "owner")
                .leftJoinAndSelect("group.students", "student")
                .leftJoinAndSelect("group.courses", "course")
                .leftJoin(user_model_1.default, "user", "user.id = :userId", { userId })
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
            const groupPromises = groups.map((group) => __awaiter(this, void 0, void 0, function* () {
                const imageUrl = yield (0, s3_1.getObjectSignedUrl)(group === null || group === void 0 ? void 0 : group.owner_avatar);
                group.owner_avatar = imageUrl;
                return group;
            }));
            const groupData = yield Promise.all(groupPromises);
            return groupData;
        });
    }
    getGroupDetail(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupDetail = yield this.manager
                .createQueryBuilder(group_model_1.default, "group")
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
            const onwerGroupAvatar = yield (0, s3_1.getObjectSignedUrl)(groupDetail === null || groupDetail === void 0 ? void 0 : groupDetail.owner_avatar);
            groupDetail.owner_avatar = onwerGroupAvatar;
            const course = yield this.manager
                .createQueryBuilder(course_model_1.default, "course")
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
                .groupBy("course.id, owner.id,groups.id")
                .where("groups.id = :groupId", { groupId: groupId })
                .getRawMany();
            const coursePromises = course.map((course) => __awaiter(this, void 0, void 0, function* () {
                const imageUrl = yield (0, s3_1.getObjectSignedUrl)(course === null || course === void 0 ? void 0 : course.owner_avatar);
                course.owner_avatar = imageUrl;
                return course;
            }));
            const courseData = yield Promise.all(coursePromises);
            const students = yield this.manager
                .createQueryBuilder(user_model_1.default, "user")
                .leftJoinAndSelect("user.addedGroups", "group")
                .where("group.id = :groupId", { groupId })
                .select([
                "user.email as student_email",
                "user.name as student_name",
                "user.avatar as student_avatar",
            ])
                .getRawMany();
            const studentPromises = students.map((student) => __awaiter(this, void 0, void 0, function* () {
                if (student.student_avatar)
                    student.student_avatar = yield (0, s3_1.getObjectSignedUrl)(student.student_avatar);
                return student;
            }));
            const studentData = yield Promise.all(studentPromises);
            return Object.assign(Object.assign({}, groupDetail), { courses: courseData, students: studentData });
        });
    }
    createGroup(userId, group) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myGroups"],
            });
            group.code = "#" + (0, shuffle_1.generateRandomCode)(7, group.id);
            user.myGroups.push(group);
            yield this.manager.save(user);
            group.owner = user;
            yield this.manager.getRepository(group_model_1.default).save(group);
        });
    }
    deleteGroup(userId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myGroups"],
            });
            user.myGroups = user.myGroups.filter((group) => group.id !== groupId);
            yield this.manager.delete(group_model_1.default, groupId);
        });
    }
    addStudent(groupId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.manager.findOne(group_model_1.default, {
                where: { id: groupId },
                relations: ["students"],
            });
            const user = yield this.manager.find(user_model_1.default, {
                where: { email: (0, typeorm_1.In)(email) },
            });
            const userToAdd = user.filter((user) => !group.students.some((student) => student.email === user.email));
            if (userToAdd.length === 0) {
                throw new ExistData_1.default("All Student is already in group");
            }
            group.students.push(...userToAdd);
            yield this.manager.save(group);
            return userToAdd.map((student) => {
                return { student_email: student.email, student_name: student.name, student_avatar: student.avatar };
            });
        });
    }
    removeStudent(groupId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.manager.findOne(group_model_1.default, {
                where: { id: groupId },
                relations: ["students"],
            });
            group.students = group.students.filter((student) => student.email !== email);
            yield this.manager.getRepository(group_model_1.default).save(group);
            return { email: email };
        });
    }
    findStudent(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.manager.findOne(user_model_1.default, {
                where: { email },
            });
            return { email: student.email, name: student.name };
        });
    }
    addCourseToGroup(groupId, userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.manager.findOne(group_model_1.default, {
                where: { id: groupId },
                relations: ["courses"],
            });
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myCourses"],
            });
            const course = user.myCourses.find((course) => course.id === courseId);
            if (!course) {
                throw new ExistData_1.default("Course is not exist in your list");
            }
            if (group.courses.find((course) => course.id === courseId)) {
                throw new ExistData_1.default("Course is already in group");
            }
            group.courses.push(course);
            yield this.manager.save(group);
            const addCourse = yield this.manager.createQueryBuilder(course_model_1.default, "course")
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
            const onwerCourseAvatar = yield (0, s3_1.getObjectSignedUrl)(addCourse === null || addCourse === void 0 ? void 0 : addCourse.owner_avatar);
            addCourse.owner_avatar = onwerCourseAvatar;
            return addCourse;
        });
    }
    removeCourseFromGroup(groupId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.manager.findOne(group_model_1.default, {
                where: { id: groupId },
                relations: ["courses"],
            });
            group.courses = group.courses.filter((course) => course.id !== courseId);
            yield this.manager.save(group);
            return { courseId: courseId };
        });
    }
}
exports.default = GroupService;
//# sourceMappingURL=group.service.js.map