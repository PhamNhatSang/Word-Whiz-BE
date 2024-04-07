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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
class BaseModel extends sequelize_typescript_1.Model {
    set _createdAt(value) {
        this.updatedAt = value;
    }
    get _createdAt() {
        return this.createdAt;
    }
    set _updatedAt(value) {
        this.updatedAt = value;
    }
    get _updatedAt() {
        return this.updatedAt;
    }
    get _id() {
        return this.id;
    }
}
exports.BaseModel = BaseModel;
__decorate([
    sequelize_typescript_2.AutoIncrement,
    sequelize_typescript_2.PrimaryKey,
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.INTEGER),
    __metadata("design:type", Number)
], BaseModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.DATE),
    __metadata("design:type", Date)
], BaseModel.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.DATE),
    __metadata("design:type", Date)
], BaseModel.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], BaseModel.prototype, "name", void 0);
//# sourceMappingURL=base-model.js.map