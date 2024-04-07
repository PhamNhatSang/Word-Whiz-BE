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
const node_lombok_1 = require("node-lombok");
const user_model_1 = __importDefault(require("./user.model"));
const comment_model_1 = __importDefault(require("./comment.model"));
const react_model_1 = __importDefault(require("./react.model"));
let Post = class Post extends base_model_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Post.prototype, "owner_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.default),
    __metadata("design:type", user_model_1.default)
], Post.prototype, "owner", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Post.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.default, () => comment_model_1.default),
    __metadata("design:type", Array)
], Post.prototype, "userComment", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.default, () => react_model_1.default),
    __metadata("design:type", Array)
], Post.prototype, "userReacts", void 0);
Post = __decorate([
    (0, sequelize_typescript_1.Table)({ modelName: "posts" }),
    (0, node_lombok_1.Data)()
], Post);
exports.default = Post;
//# sourceMappingURL=post.model.js.map