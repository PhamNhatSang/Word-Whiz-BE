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
const post_model_1 = __importDefault(require("./post.model"));
const typeorm_1 = require("typeorm");
let Comment = class Comment extends baseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, (user) => user.myComments, { onDelete: "CASCADE" }),
    __metadata("design:type", user_model_1.default)
], Comment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_model_1.default, (post) => post.postComments, { onDelete: "CASCADE" }),
    __metadata("design:type", post_model_1.default)
], Comment.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
Comment = __decorate([
    (0, typeorm_1.Entity)()
], Comment);
exports.default = Comment;
//# sourceMappingURL=comment.model.js.map