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
class GroupService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getAllGroup(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = yield this.manager.createQueryBuilder(group_model_1.default, 'group')
                .leftJoinAndSelect('group.owner', 'owner')
                .leftJoinAndSelect('group.students', 'student')
                .leftJoinAndSelect('group.courses', 'course')
                .leftJoin(user_model_1.default, 'user', 'user.id = :userId', { userId })
                .where('owner.id = :userId', { userId })
                .orWhere('student.id = :userId', { userId })
                .select([
                'group.id',
                'group.groupName AS group_name',
                'owner.name',
                'owner.avatar',
                'COUNT(DISTINCT course.id) AS numberOfCourses',
                'COUNT(DISTINCT student.id) AS numberOfMembers'
            ])
                .groupBy('group.id')
                .addGroupBy('owner.id')
                .getRawMany();
            return groups;
        });
    }
    createGroup(userId, group) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myGroups"],
            });
            user.myGroups.push(group);
            yield this.manager.save(user);
            group.owner = user;
            console.log(group);
            return yield this.manager.getRepository(group_model_1.default).save(group);
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
            yield this.manager.save(user);
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
            const userToAdd = user.filter(user => !group.students.some(student => student.email === user.email));
            if (userToAdd.length === 0) {
                throw new ExistData_1.default("All Student is already in group");
            }
            group.students.push(...userToAdd);
            return yield this.manager.save(group);
        });
    }
    removeStudent(groupId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.manager.findOne(group_model_1.default, {
                where: { id: groupId },
                relations: ["students"],
            });
            group.students = group.students.filter((student) => student.email !== email);
            return yield this.manager.getRepository(group_model_1.default).save(group);
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
        });
    }
    removeCourseFromGroup(groupId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.manager.findOne(group_model_1.default, {
                where: { id: groupId },
                relations: ["courses"],
            });
            group.courses = group.courses.filter((course) => course.id !== courseId);
            return yield this.manager.save(group);
        });
    }
}
exports.default = GroupService;
//# sourceMappingURL=group.service.js.map