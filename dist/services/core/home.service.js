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
const s3_1 = require("../../s3");
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
            const course = yield this.manager.find(course_model_1.default, {
                where: { accessiblity: Accessiblity_1.Accessiblity.PUBLIC },
                relations: ["owner", "words", "courseRate"],
            });
            const coursePromises = course.map((course) => __awaiter(this, void 0, void 0, function* () {
                let avgRate = 0;
                if (course.courseRate.length > 0)
                    avgRate =
                        course.courseRate.reduce((acc, rate) => acc + rate.rate, 0) /
                            course.courseRate.length;
                let imageUrl = null;
                const terms = course.words.length;
                if (course.owner.avatar)
                    imageUrl = yield (0, s3_1.getObjectSignedUrl)(course.owner.avatar);
                return {
                    course_id: course.id,
                    title: course.title,
                    language: course.language,
                    owner_id: course.owner.id,
                    owner_name: course.owner.name,
                    owner_avatar: imageUrl,
                    owner_email: course.owner.email,
                    terms,
                    avg_rate: avgRate,
                };
            }));
            const courseData = yield Promise.all(coursePromises);
            const courseResult = courseData.sort((a, b) => {
                return b.avg_rate - a.avg_rate;
            });
            return courseResult.slice(0, 5);
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
                "course.language as language",
                "owner.id", // Select owner fields
                "owner.name",
                "owner.email",
                "owner.avatar as owner_avatar",
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
            const coursePromises = course.map((course) => __awaiter(this, void 0, void 0, function* () {
                if (course.owner_avatar)
                    course.owner_avatar = yield (0, s3_1.getObjectSignedUrl)(course.owner_avatar);
                return course;
            }));
            const courseData = yield Promise.all(coursePromises);
            return courseData;
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
                .createQueryBuilder(course_model_1.default, "course")
                .select([
                "course.id",
                "course.title as title",
                "course.language as language",
                "owner.id as owner_id",
                "owner.name as owner_name",
                "owner.avatar as owner_avatar",
                "COUNT(word.id) as terms",
                "learning.lastWordIndex",
            ])
                .innerJoin("course.owner", "owner")
                .leftJoin("course.words", "word")
                .innerJoin("course.learnings", "learning", "learning.user.id = :learnerId", { learnerId: userId }).where("learning.isDone = :isDone", {
                isDone: false,
            })
                .groupBy("course.id, owner.id, learning.lastWordIndex")
                .getRawMany();
            const coursePromises = course.map((course) => __awaiter(this, void 0, void 0, function* () {
                let imageUrl = null;
                if (course.owner_avatar)
                    imageUrl = yield (0, s3_1.getObjectSignedUrl)(course.owner_avatar);
                course.owner_avatar = imageUrl;
                return course;
            }));
            const courseData = yield Promise.all(coursePromises);
            return courseData;
        });
    }
}
exports.default = HomeService;
//# sourceMappingURL=home.service.js.map