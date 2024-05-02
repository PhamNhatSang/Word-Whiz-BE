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
const database_1 = require("../../database");
class LibraryService extends base_service_1.BaseService {
    constructor() {
        super(course_model_1.default);
        this.createCourse = (userId, course) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId },
                relations: ["myCourses"],
            });
            user.myCourses.push(course);
            yield this.userRepository.save(user);
        });
        this.getCourseByTitle = (userId, title) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
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
            const user = yield this.userRepository.findOne({
                where: { id: userId },
                relations: ["myCourses", "courseImports"],
            });
            if (user.myCourses.find((course) => course.id === courseId)) {
                user.myCourses = user.myCourses.filter((course) => course.id !== courseId);
                this.repository.delete(courseId);
            }
            if (user.courseImports.find((course) => course.id === courseId)) {
                user.courseImports = user.courseImports.filter((course) => course.id !== courseId);
            }
            yield this.userRepository.save(user);
        });
        this.userRepository = database_1.database.getRepository(user_model_1.default);
    }
}
exports.default = LibraryService;
//# sourceMappingURL=library.service.js.map