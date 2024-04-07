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
const sequelize_typescript_1 = require("sequelize-typescript");
const base_model_1 = require("./base-model");
const course_model_1 = __importDefault(require("./course.model"));
const node_lombok_1 = require("node-lombok");
let Word = class Word extends base_model_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Word.prototype, "course_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_model_1.default),
    __metadata("design:type", course_model_1.default)
], Word.prototype, "course", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Word.prototype, "term", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Word.prototype, "definition", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Word.prototype, "example", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Word.prototype, "explanation", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Word.prototype, "image", void 0);
Word = __decorate([
    (0, sequelize_typescript_1.Table)({ modelName: "words" }),
    (0, node_lombok_1.Data)()
], Word);
exports.default = Word;
//# sourceMappingURL=word.model.js.map