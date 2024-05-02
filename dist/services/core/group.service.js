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
const database_1 = require("../../database");
const ExistData_1 = __importDefault(require("../../exceptions/ExistData"));
class GroupService extends base_service_1.BaseService {
    constructor() {
        super(group_model_1.default);
        this.userRepository = database_1.database.getRepository(user_model_1.default);
    }
    getAllGroup(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId },
                relations: ["myGroups", "addedGroups"],
            });
            const groupAll = user.myGroups.concat(user.addedGroups);
            return groupAll;
        });
    }
    createGroup(userId, group) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId },
                relations: ["myGroups"],
            });
            user.myGroups.push(group);
            yield this.userRepository.save(user);
        });
    }
    deleteGroup(userId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId },
                relations: ["myGroups"],
            });
            user.myGroups = user.myGroups.filter((group) => group.id !== groupId);
            yield this.repository.delete(groupId);
            yield this.userRepository.save(user);
        });
    }
    addStudent(groupId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.repository.findOne({
                where: { id: groupId },
                relations: ["students"],
            });
            const user = yield this.userRepository.findOne({
                where: { email: (0, typeorm_1.In)(email) },
            });
            group.students.push(user);
            return yield this.repository.save(group);
        });
    }
    removeStudent(groupId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.repository.findOne({
                where: { id: groupId },
                relations: ["students"],
            });
            const user = yield this.userRepository.findOne({
                where: { email: (0, typeorm_1.In)(email) },
            });
            group.students = group.students.filter((student) => !email.includes(student.email));
            yield this.repository.save(group);
        });
    }
    findStudent(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.userRepository.findOne({
                where: { email },
            });
            return { email: student.email, name: student.name };
        });
    }
    addCourseToGroup(groupId, userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.repository.findOne({
                where: { id: groupId },
                relations: ["courses"],
            });
            const user = yield this.userRepository.findOne({
                where: { id: userId },
                relations: ["myCourses"],
            });
            const course = user.myCourses.find((course) => course.id === courseId);
            if (group.courses.find((course) => course.id === courseId)) {
                throw new ExistData_1.default("Course is already in group");
            }
            group.courses.push(course);
            group.students.forEach((student) => { student.courseImports.push(course); this.userRepository.save(student); });
            yield this.repository.save(group);
        });
    }
    removeCourseFromGroup(groupId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.repository.findOne({
                where: { id: groupId },
                relations: ["courses"],
            });
            group.courses = group.courses.filter((course) => course.id !== courseId);
            return yield this.repository.save(group);
        });
    }
}
exports.default = GroupService;
//# sourceMappingURL=group.service.js.map