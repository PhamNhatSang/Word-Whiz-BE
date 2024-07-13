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
const testGroup_model_1 = __importDefault(require("../../models/testGroup.model"));
const test_model_1 = __importDefault(require("../../models/test.model"));
const testItem_model_1 = __importDefault(require("../../models/testItem.model"));
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
                if (group.owner_avatar)
                    group.owner_avatar = yield (0, s3_1.getObjectSignedUrl)(group === null || group === void 0 ? void 0 : group.owner_avatar);
                return group;
            }));
            const groupData = yield Promise.all(groupPromises);
            return groupData;
        });
    }
    getGroupDetail(userId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myGroups", "addedGroups"],
            });
            const group = yield this.manager.findOne(group_model_1.default, { where: { id: groupId } });
            if (!group) {
                throw new ExistData_1.default("Group does not exist");
            }
            const isGroupMember = user.myGroups.some((group) => group.id === groupId) ||
                user.addedGroups.some((group) => group.id === groupId);
            if (!isGroupMember) {
                throw new Error("Group is not in your list");
            }
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
            if (groupDetail === null || groupDetail === void 0 ? void 0 : groupDetail.owner_avatar) {
                groupDetail.owner_avatar = yield (0, s3_1.getObjectSignedUrl)(groupDetail.owner_avatar);
            }
            const courses = yield this.manager
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
                .groupBy("course.id, owner.id, groups.id")
                .where("groups.id = :groupId", { groupId })
                .getRawMany();
            const courseData = yield Promise.all(courses.map((course) => __awaiter(this, void 0, void 0, function* () {
                if (course.owner_avatar) {
                    course.owner_avatar = yield (0, s3_1.getObjectSignedUrl)(course.owner_avatar);
                }
                return course;
            })));
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
            const studentData = yield Promise.all(students.map((student) => __awaiter(this, void 0, void 0, function* () {
                if (student.student_avatar) {
                    student.student_avatar = yield (0, s3_1.getObjectSignedUrl)(student.student_avatar);
                }
                return student;
            })));
            return Object.assign(Object.assign({}, groupDetail), { courses: courseData, students: studentData });
        });
    }
    createGroup(userId, group) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myGroups"],
            });
            group.owner = user;
            const groupCreate = yield this.manager.getRepository(group_model_1.default).save(group);
            groupCreate.code = "#" + (0, shuffle_1.generateRandomCode)(7, groupCreate.id);
            yield this.manager.getRepository(group_model_1.default).save(groupCreate);
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
            const userDataToAdd = userToAdd.map((student) => __awaiter(this, void 0, void 0, function* () {
                if (student.avatar)
                    student.avatar = yield (0, s3_1.getObjectSignedUrl)(student.avatar);
                return { student_email: student.email, student_name: student.name, student_avatar: student.avatar };
            }));
            const testGroups = yield this.manager.find(testGroup_model_1.default, {
                where: { group: { id: groupId } },
                relations: ["tests"],
            });
            for (const testGroup of testGroups) {
                for (const student of userToAdd) {
                    if (testGroup.tests.length === 1 && testGroup.tests[0].user == null) {
                        testGroup.tests[0].user = student;
                        try {
                            yield this.manager.getRepository(testGroup_model_1.default).save(testGroup);
                        }
                        catch (error) {
                            console.error('Error saving testGroup:', error);
                        }
                    }
                    else {
                        const test = new test_model_1.default();
                        const newTestItems = testGroup.tests[0].testItems.map((testItem) => {
                            const newTestItemData = new testItem_model_1.default();
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
                            yield this.manager.getRepository(test_model_1.default).save(test);
                        }
                        catch (error) {
                            console.error('Error saving test:', error);
                        }
                    }
                }
            }
            const userDataReturn = yield Promise.all(userDataToAdd);
            return userDataReturn;
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
            if (addCourse.owner_avatar)
                addCourse.owner_avatar = yield (0, s3_1.getObjectSignedUrl)(addCourse === null || addCourse === void 0 ? void 0 : addCourse.owner_avatar);
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