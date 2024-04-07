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
const base_model_1 = require("./base-model");
const sequelize_typescript_1 = require("sequelize-typescript");
const Role_1 = require("../enum/Role");
const group_model_1 = __importDefault(require("./group.model"));
const group_detail_model_1 = __importDefault(require("./group-detail.model"));
const course_model_1 = __importDefault(require("./course.model"));
const node_lombok_1 = require("node-lombok");
const post_model_1 = __importDefault(require("./post.model"));
const comment_model_1 = __importDefault(require("./comment.model"));
const course_rate_model_1 = __importDefault(require("./course-rate.model"));
const react_model_1 = __importDefault(require("./react.model"));
let User = class User extends base_model_1.BaseModel {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM("admin", "student", "teacher")),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => group_model_1.default),
    __metadata("design:type", Array)
], User.prototype, "my_groups", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => course_model_1.default),
    __metadata("design:type", Array)
], User.prototype, "my_courses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => post_model_1.default),
    __metadata("design:type", Array)
], User.prototype, "my_posts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => group_model_1.default, () => group_detail_model_1.default),
    __metadata("design:type", Array)
], User.prototype, "groups", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => post_model_1.default, () => comment_model_1.default),
    __metadata("design:type", Array)
], User.prototype, "postComments", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => post_model_1.default, () => react_model_1.default),
    __metadata("design:type", Array)
], User.prototype, "postReacts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => course_model_1.default, () => course_rate_model_1.default),
    __metadata("design:type", Array)
], User.prototype, "postRates", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ modelName: "users" }),
    (0, node_lombok_1.Data)()
], User);
exports.default = User;
//# sourceMappingURL=user.model.js.map