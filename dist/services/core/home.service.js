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
const user_model_1 = __importDefault(require("../../models/user.model"));
const typeorm_1 = require("typeorm");
const base_service_1 = require("../base/base.service");
const Accessiblity_1 = require("../../enum/Accessiblity");
const ExistData_1 = __importDefault(require("../../exceptions/ExistData"));
class HomeService extends base_service_1.BaseService {
    constructor() {
        super();
        this.getCourseByTitle = (title) => __awaiter(this, void 0, void 0, function* () {
            const course = yield this.manager.find(course_model_1.default, {
                where: { title: (0, typeorm_1.Like)(`%${title}%`), accessiblity: Accessiblity_1.Accessiblity.PUBLIC },
            });
            return course;
        });
        this.getTopCourse = () => __awaiter(this, void 0, void 0, function* () {
            const course = yield this.manager
                .createQueryBuilder(course_model_1.default, "course")
                .leftJoin("course.courseRate", "courseRate") // Assuming you have a courseRates relationship
                .leftJoinAndSelect("course.owner", "owner")
                .leftJoin("course.words", "word") // Join with words relation
                .select([
                "course.id",
                "course.title as title", // Add other course fields as needed
                "course.accessiblity as accessiblity",
                "owner.id", // Select owner fields
                "owner.name",
                "owner.email",
                "owner.avatar",
            ])
                .where("course.accessiblity = :accessiblity", {
                accessiblity: Accessiblity_1.Accessiblity.PUBLIC,
            })
                .addSelect("AVG(courseRate.rate)", "avgrate")
                .addSelect("COUNT(word.id)", "terms") // Count items in words relation and alias it as terms
                .groupBy("course.id, owner.id")
                .orderBy("avgrate", "DESC")
                .limit(5)
                .getRawMany();
            return course;
        });
        this.getNewCourse = () => __awaiter(this, void 0, void 0, function* () {
            const course = yield this.manager
                .createQueryBuilder(course_model_1.default, "course")
                .leftJoinAndSelect("course.owner", "owner")
                .leftJoin("course.words", "word") // Join with words relation
                .select([
                "course.id",
                "course.title as title", // Add other course fields as needed
                "course.accessiblity as accessiblity",
                "owner.id", // Select owner fields
                "owner.name",
                "owner.email",
                "owner.avatar",
            ])
                .where("course.accessiblity = :accessiblity", {
                accessiblity: Accessiblity_1.Accessiblity.PUBLIC,
            })
                .addSelect("COUNT(word.id)", "terms")
                .addSelect("course.createdAt", "createdat") // Count items in words relation and alias it as terms
                .groupBy("course.id, owner.id")
                .orderBy("createdAt", "DESC")
                .limit(5)
                .getRawMany();
            return course;
        });
        this.importCourse = (userId, courseId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, {
                where: { id: userId },
                relations: ["courseImports", "myCourses", "learnings"],
            });
            const course = yield this.manager.findOne(course_model_1.default, {
                where: { id: courseId },
            });
            if (user.courseImports.find((course) => course.id === courseId) ||
                user.myCourses.find((course) => course.id === courseId)) {
                throw new ExistData_1.default("Course is already");
            }
            user.courseImports.push(course);
            yield this.manager.getRepository(user_model_1.default).save(user);
        });
        this.getContinueCourse = (userId) => __awaiter(this, void 0, void 0, function* () {
            const course = yield this.manager
                .createQueryBuilder(course_model_1.default, 'course')
                .select([
                'course.id as courseId',
                'course.title as title',
                'owner.id as owner_id',
                'owner.name as owner_name',
                'owner.avatar as owner_avatar',
                'COUNT(word.id) as terms',
                'learning.lastWordIndex',
            ])
                .innerJoin('course.owner', 'owner')
                .leftJoin('course.words', 'word')
                .leftJoin('course.learnings', 'learning', 'learning.user.id = :learnerId', { learnerId: userId })
                .groupBy('course.id, owner.id, learning.lastWordIndex')
                .getRawMany();
            return course;
        });
    }
}
exports.default = HomeService;
//# sourceMappingURL=home.service.js.map