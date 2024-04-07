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
const Accessiblity_1 = require("../enum/Accessiblity");
const base_model_1 = require("./base-model");
const sequelize_typescript_1 = require("sequelize-typescript");
const group_model_1 = __importDefault(require("./group.model"));
const group_detail_model_1 = __importDefault(require("./group-detail.model"));
const user_model_1 = __importDefault(require("./user.model"));
const word_model_1 = __importDefault(require("./word.model"));
const test_model_1 = __importDefault(require("./test.model"));
const node_lombok_1 = require("node-lombok");
const course_rate_model_1 = __importDefault(require("./course-rate.model"));
let Course = class Course extends base_model_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Course.prototype, "owner_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.default),
    __metadata("design:type", user_model_1.default)
], Course.prototype, "owner", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM("public", "private")),
    __metadata("design:type", String)
], Course.prototype, "accessiblity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Course.prototype, "is_creadted", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => word_model_1.default),
    __metadata("design:type", Array)
], Course.prototype, "words", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => test_model_1.default),
    __metadata("design:type", test_model_1.default)
], Course.prototype, "test", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => group_model_1.default, () => group_detail_model_1.default),
    __metadata("design:type", Array)
], Course.prototype, "groups", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.default, () => course_rate_model_1.default),
    __metadata("design:type", Array)
], Course.prototype, "userRates", void 0);
Course = __decorate([
    (0, sequelize_typescript_1.Table)({ modelName: "courses" }),
    (0, node_lombok_1.Data)()
], Course);
exports.default = Course;
//# sourceMappingURL=course.model.js.map