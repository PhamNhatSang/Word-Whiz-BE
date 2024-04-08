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
const test_model_1 = __importDefault(require("./test.model"));
const node_lombok_1 = require("node-lombok");
let TestItem = class TestItem extends base_model_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => test_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TestItem.prototype, "test_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => test_model_1.default),
    __metadata("design:type", test_model_1.default)
], TestItem.prototype, "test", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], TestItem.prototype, "question", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], TestItem.prototype, "option_1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], TestItem.prototype, "option_2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], TestItem.prototype, "option_3", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], TestItem.prototype, "option_4", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], TestItem.prototype, "correct_answer", void 0);
TestItem = __decorate([
    (0, sequelize_typescript_1.Table)({ modelName: 'test_items' }),
    (0, node_lombok_1.Data)()
], TestItem);
exports.default = TestItem;
//# sourceMappingURL=test-item.model.js.map