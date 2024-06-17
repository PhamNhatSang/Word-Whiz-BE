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
const test_model_1 = __importDefault(require("./test.model"));
const typeorm_1 = require("typeorm");
const baseModel_1 = require("./baseModel");
const word_model_1 = __importDefault(require("./word.model"));
let TestItem = class TestItem extends baseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => word_model_1.default, (word) => word.testItems, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", word_model_1.default)
], TestItem.prototype, "word", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], TestItem.prototype, "option_1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], TestItem.prototype, "option_2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], TestItem.prototype, "option_3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], TestItem.prototype, "option_4", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: 'user_answer', nullable: true, default: '' }),
    __metadata("design:type", String)
], TestItem.prototype, "user_answer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => test_model_1.default, (test) => test.testItems, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", test_model_1.default)
], TestItem.prototype, "test", void 0);
TestItem = __decorate([
    (0, typeorm_1.Entity)()
], TestItem);
exports.default = TestItem;
//# sourceMappingURL=testItem.model.js.map