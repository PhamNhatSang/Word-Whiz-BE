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
const user_model_1 = __importDefault(require("./user.model"));
const group_detail_model_1 = __importDefault(require("./group-detail.model"));
const typeorm_1 = require("typeorm");
let Group = class Group extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Group.prototype, "group_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Group.prototype, "group_description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, (user) => user.myGroups),
    __metadata("design:type", user_model_1.default)
], Group.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_detail_model_1.default, (groupDetail) => groupDetail.group, { nullable: true }),
    __metadata("design:type", Array)
], Group.prototype, "groupDetails", void 0);
Group = __decorate([
    (0, typeorm_1.Entity)({ name: "groups" })
], Group);
exports.default = Group;
//# sourceMappingURL=group.model.js.map