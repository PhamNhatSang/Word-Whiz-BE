"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Accessiblity_1 = require("../enum/Accessiblity");
const base_model_1 = require("./base-model");
const group_detail_model_1 = __importDefault(require("./group-detail.model"));
const user_model_1 = __importDefault(require("./user.model"));
const word_model_1 = __importDefault(require("./word.model"));
const test_model_1 = __importDefault(require("./test.model"));
const course_rate_model_1 = __importDefault(require("./course-rate.model"));
const typeorm_1 = require("typeorm");
let Course = class Course extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, (user) => user.myCourses),
    __metadata("design:type", user_model_1.default)
], Course.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ["PUBLIC", "PRIVATE"], default: "PUBLIC" }),
    __metadata("design:type", String)
], Course.prototype, "accessiblity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean" }),
    __metadata("design:type", Boolean)
], Course.prototype, "is_creadted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => word_model_1.default, (word) => word.course, { nullable: true }),
    __metadata("design:type", Array)
], Course.prototype, "words", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => test_model_1.default),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", test_model_1.default)
], Course.prototype, "test", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_detail_model_1.default, (groupDetail) => groupDetail.course),
    __metadata("design:type", Array)
], Course.prototype, "groupDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_rate_model_1.default, (courseRate) => courseRate.course),
    __metadata("design:type", Array)
], Course.prototype, "courseRate", void 0);
Course = __decorate([
    (0, typeorm_1.Entity)({ name: "courses" })
], Course);
exports.default = Course;
//# sourceMappingURL=course.model.js.map