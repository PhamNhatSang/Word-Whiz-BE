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
class CourseDetailService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getCourseDetail(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.manager.findOne(course_model_1.default, {
                where: { id: courseId },
                relations: ["words"],
            });
            return course;
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
}
exports.default = CourseDetailService;
//# sourceMappingURL=courseDetail.service.js.map