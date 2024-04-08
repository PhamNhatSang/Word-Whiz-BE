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
const sequelize_typescript_1 = require("sequelize-typescript");
const base_model_1 = require("./base-model");
const group_model_1 = __importDefault(require("./group.model"));
const user_model_1 = __importDefault(require("./user.model"));
const course_model_1 = __importDefault(require("./course.model"));
const node_lombok_1 = require("node-lombok");
let GroupDetail = class GroupDetail extends base_model_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => group_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], GroupDetail.prototype, "group_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], GroupDetail.prototype, "student_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], GroupDetail.prototype, "course_id", void 0);
GroupDetail = __decorate([
    (0, sequelize_typescript_1.Table)({ modelName: 'group_details' }),
    (0, node_lombok_1.Data)()
], GroupDetail);
exports.default = GroupDetail;
//# sourceMappingURL=group-detail.model.js.map