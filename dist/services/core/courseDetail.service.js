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
const base_service_1 = require("../base/base.service");
class CourseDetailService extends base_service_1.BaseService {
    constructor() {
        super(course_model_1.default);
    }
    getCourseDetail(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.repository.findOne({
                where: { id: courseId },
                relations: ["words"],
            });
            return course;
        });
    }
    createWord(courseId, word) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.repository.findOne({
                where: { id: courseId },
                relations: ["words"],
            });
            course.words.push(word);
            return word;
        });
    }
    deleteWord(courseId, wordId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.repository.findOne({
                where: { id: courseId },
                relations: ["words"],
            });
            course.words = course.words.filter((word) => word.id !== wordId);
            yield this.repository.save(course);
            return wordId;
        });
    }
    updateWord(courseId, word) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.repository.findOne({
                where: { id: courseId },
                relations: ["words"],
            });
            const index = course.words.findIndex((w) => w.id === word.id);
            course.words[index] = word;
            yield this.repository.save(course);
            return word;
        });
    }
}
exports.default = CourseDetailService;
//# sourceMappingURL=courseDetail.service.js.map