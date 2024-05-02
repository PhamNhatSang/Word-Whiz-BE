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
const baseModel_1 = require("./baseModel");
const Role_1 = require("../enum/Role");
const group_model_1 = __importDefault(require("./group.model"));
const course_model_1 = __importDefault(require("./course.model"));
const post_model_1 = __importDefault(require("./post.model"));
const comment_model_1 = __importDefault(require("./comment.model"));
const courseRate_model_1 = __importDefault(require("./courseRate.model"));
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const react_model_1 = __importDefault(require("./react.model"));
const class_validator_1 = require("class-validator");
const test_model_1 = __importDefault(require("./test.model"));
let User = class User extends baseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_2.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: "enum", enum: ["ADMIN", "STUDENT", "TEACHER"], default: "STUDENT" }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_2.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refeshToken", void 0);
__decorate([
    (0, typeorm_2.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_model_1.default, (group) => group.owner, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "myGroups", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_model_1.default, (course) => course.owner, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "myCourses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_model_1.default, (post) => post.owner, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "myPosts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => courseRate_model_1.default, (courseRate) => courseRate.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "courseRate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_model_1.default, (comment) => comment.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "myComments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => react_model_1.default, (react) => react.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "myReacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => test_model_1.default, (test) => test.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "myTests", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => course_model_1.default, (course) => course.userImporteds, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "courseImports", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => group_model_1.default, (group) => group.students),
    __metadata("design:type", Array)
], User.prototype, "addedGroups", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: "users" })
], User);
exports.default = User;
//# sourceMappingURL=user.model.js.map