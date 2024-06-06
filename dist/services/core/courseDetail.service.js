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
const course_model_1 = __importDefault(require("../../models/course.model"));
const word_model_1 = __importDefault(require("../../models/word.model"));
const base_service_1 = require("../base/base.service");
const user_model_1 = __importDefault(require("../../models/user.model"));
const courseRate_model_1 = __importDefault(require("../../models/courseRate.model"));
class CourseDetailService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getCourseDetail(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.manager.findOne(course_model_1.default, {
                where: { id: courseId },
                relations: { owner: true, words: true },
            });
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["myCourses", "courseImports"],
            });
            const courseRate = yield this.manager.findOne(courseRate_model_1.default, { where: { course: { id: courseId }, user: { id: userId } } });
            const isInLibrary = user.courseImports.some((courseImport) => courseImport.id === courseId) || user.myCourses.some((myCourse) => myCourse.id === courseId);
            const courseDetail = Object.assign(Object.assign({}, course), { owner_id: course.owner.id, isInLibrary: isInLibrary, rate: courseRate === null || courseRate === void 0 ? void 0 : courseRate.rate });
            delete courseDetail.owner;
            return courseDetail;
        });
    }
    createWord(courseId, words) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(words);
            const course = yield this.manager.findOne(course_model_1.default, {
                where: { id: courseId },
            });
            const wordCreates = yield this.manager.getRepository(word_model_1.default).save(words);
            course.words = wordCreates;
            yield this.manager.getRepository(course_model_1.default).save(course);
        });
    }
    updateCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseUpdate = yield this.manager.getRepository(course_model_1.default).save(course);
            const orphanedWords = yield this.manager.createQueryBuilder(word_model_1.default, 'word')
                .leftJoinAndSelect('word.course', 'course')
                .where('word.courseId IS NULL')
                .getMany();
            if (orphanedWords.length > 0)
                yield this.manager.remove(orphanedWords);
            return courseUpdate;
        });
    }
    rateCourse(userId, courseId, rate) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseRate = yield this.manager.findOne(courseRate_model_1.default, { where: { course: { id: courseId }, user: { id: userId } } });
            if (courseRate) {
                courseRate.rate = rate;
                yield this.manager.getRepository(courseRate_model_1.default).save(courseRate);
            }
            else {
                const course = yield this.manager.findOne(course_model_1.default, {
                    where: { id: courseId },
                });
                const user = yield this.manager.findOne(user_model_1.default, {
                    where: { id: userId },
                });
                const courseRate = new courseRate_model_1.default();
                courseRate.course = course;
                courseRate.user = user;
                courseRate.rate = rate;
                yield this.manager.getRepository(courseRate_model_1.default).save(courseRate);
            }
        });
    }
}
exports.default = CourseDetailService;
//# sourceMappingURL=courseDetail.service.js.map