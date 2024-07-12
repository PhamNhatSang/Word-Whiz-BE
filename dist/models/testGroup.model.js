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
const typeorm_1 = require("typeorm");
const group_model_1 = __importDefault(require("./group.model"));
const test_model_1 = __importDefault(require("./test.model"));
let TestGroup = class TestGroup extends baseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, name: "testName", nullable: true }),
    __metadata("design:type", String)
], TestGroup.prototype, "testName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_model_1.default, (group) => group.testGroups, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", group_model_1.default)
], TestGroup.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => test_model_1.default, (test) => test.testGroup, { nullable: true, cascade: true }),
    __metadata("design:type", Array)
], TestGroup.prototype, "tests", void 0);
TestGroup = __decorate([
    (0, typeorm_1.Entity)()
], TestGroup);
exports.default = TestGroup;
//# sourceMappingURL=testGroup.model.js.map