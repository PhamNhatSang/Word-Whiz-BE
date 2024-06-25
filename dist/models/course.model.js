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
const baseModel_1 = require("./baseModel");
const group_model_1 = __importDefault(require("./group.model"));
const user_model_1 = __importDefault(require("./user.model"));
const word_model_1 = __importDefault(require("./word.model"));
const test_model_1 = __importDefault(require("./test.model"));
const courseRate_model_1 = __importDefault(require("./courseRate.model"));
const typeorm_1 = require("typeorm");
const learning_model_1 = __importDefault(require("./learning.model"));
const post_model_1 = __importDefault(require("./post.model"));
let Course = class Course extends baseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, (user) => user.myCourses, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
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
    (0, typeorm_1.OneToMany)(() => word_model_1.default, (word) => word.course, { nullable: true, cascade: true }),
    __metadata("design:type", Array)
], Course.prototype, "words", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => test_model_1.default, (test) => test.course, { nullable: true, cascade: true }),
    __metadata("design:type", Array)
], Course.prototype, "tests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => courseRate_model_1.default, (courseRate) => courseRate.course, { nullable: true, cascade: true }),
    __metadata("design:type", Array)
], Course.prototype, "courseRate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => learning_model_1.default, (learning) => learning.course, { nullable: true, cascade: true }),
    __metadata("design:type", Array)
], Course.prototype, "learnings", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => group_model_1.default, (group) => group.courses, { nullable: true }),
    __metadata("design:type", Array)
], Course.prototype, "addedGroups", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => post_model_1.default, (post) => post.courses, { nullable: true }),
    __metadata("design:type", Array)
], Course.prototype, "addedPosts", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_model_1.default, (user) => user.courseImports, { nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinTable)({
        name: "course_imports", // table name for the junction table of this relation
        joinColumn: {
            name: "course_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], Course.prototype, "userImporteds", void 0);
Course = __decorate([
    (0, typeorm_1.Entity)()
], Course);
exports.default = Course;
//# sourceMappingURL=course.model.js.map