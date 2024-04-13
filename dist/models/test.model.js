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
const test_item_model_1 = __importDefault(require("./test-item.model"));
const typeorm_1 = require("typeorm");
let Test = class Test extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Test.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Test.prototype, "is_first_done", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => test_item_model_1.default, (testItem) => testItem.test, { nullable: true }),
    __metadata("design:type", Array)
], Test.prototype, "testItems", void 0);
Test = __decorate([
    (0, typeorm_1.Entity)({ name: "tests" })
], Test);
exports.default = Test;
//# sourceMappingURL=test.model.js.map