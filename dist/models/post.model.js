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
const comment_model_1 = __importDefault(require("./comment.model"));
const react_model_1 = __importDefault(require("./react.model"));
const typeorm_1 = require("typeorm");
const course_model_1 = __importDefault(require("./course.model"));
let Post = class Post extends baseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, (user) => user.myPosts, { onDelete: "CASCADE" }),
    __metadata("design:type", user_model_1.default)
], Post.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_model_1.default, (comment) => comment.post, { nullable: true, cascade: true }),
    __metadata("design:type", Array)
], Post.prototype, "postComments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => react_model_1.default, (react) => react.post, { nullable: true, cascade: true }),
    __metadata("design:type", Array)
], Post.prototype, "postReacts", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => course_model_1.default, (cousre) => cousre.addedPosts, { nullable: true }),
    (0, typeorm_1.JoinTable)({
        name: "post_courses",
        joinColumn: {
            name: "post_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "course_id",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], Post.prototype, "courses", void 0);
Post = __decorate([
    (0, typeorm_1.Entity)()
], Post);
exports.default = Post;
//# sourceMappingURL=post.model.js.map