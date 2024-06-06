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
const course_model_1 = __importDefault(require("./course.model"));
const typeorm_1 = require("typeorm");
let CourseRate = class CourseRate extends baseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_model_1.default, (course) => course.courseRate),
    __metadata("design:type", course_model_1.default)
], CourseRate.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, (user) => user.courseRate),
    __metadata("design:type", user_model_1.default)
], CourseRate.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 1 }),
    __metadata("design:type", Number)
], CourseRate.prototype, "rate", void 0);
CourseRate = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Check)(`"rate" > 0 AND "rate" < 6`)
], CourseRate);
exports.default = CourseRate;
//# sourceMappingURL=courseRate.model.js.map