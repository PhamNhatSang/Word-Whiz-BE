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
const database_1 = require("../../database");
const base_service_1 = require("../base/base.service");
const Accessiblity_1 = require("../../enum/Accessiblity");
const ExistData_1 = __importDefault(require("../../exceptions/ExistData"));
class HomeService extends base_service_1.BaseService {
    constructor() {
        super(course_model_1.default);
        this.getCourseByTitle = (title) => __awaiter(this, void 0, void 0, function* () {
            const course = yield this.repository.find({
                where: { title: (0, typeorm_1.Like)(`%${title}%`), accessiblity: Accessiblity_1.Accessiblity.PUBLIC },
            });
            return course;
        });
        this.getTopCourse = () => __awaiter(this, void 0, void 0, function* () {
            const course = yield this.repository.createQueryBuilder('course')
                .leftJoin('course.courseRates', 'courseRate') // Assuming you have a courseRates relationship
                .select('course')
                .where('course.accessiblity = :accessiblity', { accessiblity: Accessiblity_1.Accessiblity.PUBLIC })
                .addSelect('AVG(courseRate.rate)', 'avgRate') // Select average rate as avgRate
                .groupBy('course.id')
                .orderBy('avgRate', 'DESC')
                .limit(5).getRawMany();
            return course;
        });
        this.getNewCourse = () => __awaiter(this, void 0, void 0, function* () {
            const course = yield this.repository.find({
                where: { accessiblity: Accessiblity_1.Accessiblity.PUBLIC },
                order: { createdAt: "DESC" },
                take: 5,
            });
            return course;
        });
        this.importCourse = (userId, courseId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId },
                relations: ["courseImports"],
            });
            const course = yield this.repository.findOne({
                where: { id: courseId },
            });
            if (user.courseImports.find((course) => course.id === courseId)) {
                throw new ExistData_1.default("Course is already imported");
            }
            user.courseImports.push(course);
            yield this.userRepository.save(user);
        });
        this.userRepository = database_1.database.getRepository(user_model_1.default);
    }
}
exports.default = HomeService;
//# sourceMappingURL=home.service.js.map