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
const base_model_1 = require("./base-model");
const group_model_1 = __importDefault(require("./group.model"));
const user_model_1 = __importDefault(require("./user.model"));
const course_model_1 = __importDefault(require("./course.model"));
const typeorm_1 = require("typeorm");
let GroupDetail = class GroupDetail extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_model_1.default, (group) => group.groupDetails),
    __metadata("design:type", group_model_1.default)
], GroupDetail.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, (user) => user.groupDetails, { nullable: true }),
    __metadata("design:type", user_model_1.default)
], GroupDetail.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_model_1.default, (course) => course.groupDetails, { nullable: true }),
    __metadata("design:type", course_model_1.default)
], GroupDetail.prototype, "course", void 0);
GroupDetail = __decorate([
    (0, typeorm_1.Entity)({ name: "group_details" })
], GroupDetail);
exports.default = GroupDetail;
//# sourceMappingURL=group-detail.model.js.map