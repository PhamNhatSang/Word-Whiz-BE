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
const user_model_1 = __importDefault(require("./user.model"));
const group_detail_model_1 = __importDefault(require("./group-detail.model"));
const course_model_1 = __importDefault(require("./course.model"));
const node_lombok_1 = require("node-lombok");
let Group = class Group extends base_model_1.BaseModel {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Group.prototype, "group_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Group.prototype, "group_description", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Group.prototype, "owner_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.default),
    __metadata("design:type", user_model_1.default)
], Group.prototype, "owner", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.default, () => group_detail_model_1.default),
    __metadata("design:type", Array)
], Group.prototype, "students", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => course_model_1.default, () => group_detail_model_1.default),
    __metadata("design:type", Array)
], Group.prototype, "courses", void 0);
Group = __decorate([
    (0, sequelize_typescript_1.Table)({ modelName: 'groups' }),
    (0, node_lombok_1.Data)()
], Group);
exports.default = Group;
//# sourceMappingURL=group.model.js.map