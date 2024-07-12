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
const user_model_1 = __importDefault(require("./user.model"));
const typeorm_1 = require("typeorm");
const course_model_1 = __importDefault(require("./course.model"));
const testGroup_model_1 = __importDefault(require("./testGroup.model"));
let Group = class Group extends baseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: "group_name" }),
    __metadata("design:type", String)
], Group.prototype, "groupName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: "group_description" }),
    __metadata("design:type", String)
], Group.prototype, "groupDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: "group_code" }),
    __metadata("design:type", String)
], Group.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, (user) => user.myGroups, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", user_model_1.default)
], Group.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_model_1.default, (user) => user.addedGroups, { nullable: true, cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: "group_students",
        joinColumn: {
            name: "group_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], Group.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => testGroup_model_1.default, (testGroup) => testGroup.group, { nullable: true, cascade: true }),
    __metadata("design:type", Array)
], Group.prototype, "testGroups", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => course_model_1.default, (cousre) => cousre.addedGroups, { nullable: true, cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: "group_courses",
        joinColumn: {
            name: "group_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "course_id",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], Group.prototype, "courses", void 0);
Group = __decorate([
    (0, typeorm_1.Entity)()
], Group);
exports.default = Group;
//# sourceMappingURL=group.model.js.map