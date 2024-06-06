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
const course_model_1 = __importDefault(require("../../models/course.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const group_model_1 = __importDefault(require("../../models/group.model"));
class LibraryService extends base_service_1.BaseService {
    constructor() {
        super();
        this.getAllCourse = (userId) => __awaiter(this, void 0, void 0, function* () {
            const myCourses = yield this.manager
                .createQueryBuilder(course_model_1.default, "course")
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
                .where("owner.id = :userId", { userId: userId })
                .groupBy("course.id, owner.id")
                .getRawMany();
            const importCourses = yield this.manager
                .createQueryBuilder(course_model_1.default, "course")
                .leftJoinAndSelect("course.owner", "owner")
                .leftJoin("course.words", "words")
                .innerJoin("course.userImporteds", "userImporteds")
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
                .where("userImporteds.id = :userId", { userId: userId })
                .groupBy("course.id, owner.id")
                .getRawMany();
            return { myCourses, importCourses };
        });
        this.createCourse = (userId, course) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myCourses", "learnings"],
            });
            course.owner = user;
            yield this.manager.getRepository(course_model_1.default).save(course);
        });
        this.getCourseByTitle = (userId, title) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myCourses, courseImports"],
            });
            if (title === "")
                return {
                    myCourseTitle: user.myCourses,
                    courseImportTitle: user.courseImports,
                };
            const myCourseTitle = user.myCourses.find((course) => course.title === title);
            const courseImportTitle = user.courseImports.find((course) => course.title === title);
            return { myCourseTitle, courseImportTitle };
        });
        this.deleteCourse = (userId, courseId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myCourses"],
            });
            if (user.myCourses.find((course) => course.id === courseId)) {
                yield this.manager.delete(course_model_1.default, courseId);
                return courseId;
            }
            if (user.courseImports.find((course) => course.id === courseId)) {
                user.courseImports = user.courseImports.filter((course) => course.id !== courseId);
                yield this.manager.save(user);
                return courseId;
            }
            throw new Error("Course not found");
        });
        this.getListCourseToAddGroup = (userId, groupId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myCourses"],
            });
            const group = yield this.manager.findOne(group_model_1.default, {
                where: { id: groupId },
                relations: ["courses"],
            });
            const courseToAdd = user.myCourses.map((course) => {
                var isAdded = false;
                if (group.courses.find((courseGroup) => courseGroup.id === course.id)) {
                    isAdded = true;
                }
                return {
                    courseName: course.title,
                    courseId: course.id,
                    isAdded: isAdded,
                };
            });
            return courseToAdd;
        });
        this.getListCourseToAddPost = (userId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myCourses"],
            });
            const courseToAdd = user.myCourses.map((course) => {
                return {
                    courseName: course.title,
                    courseId: course.id,
                    isInPost: false,
                };
            });
            return courseToAdd;
        });
    }
}
exports.default = LibraryService;
//# sourceMappingURL=library.service.js.map