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
const Emotion_1 = require("../enum/Emotion");
const typeorm_1 = require("typeorm");
let React = class React extends baseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, (user) => user.myReacts),
    __metadata("design:type", user_model_1.default)
], React.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_model_1.default, (post) => post.postReacts, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", post_model_1.default)
], React.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["LIKE", "SAD", "HAHA", "WOW", "LOVE", "ANGRY", "NONE"],
        default: "LIKE",
    }),
    __metadata("design:type", String)
], React.prototype, "emotion", void 0);
React = __decorate([
    (0, typeorm_1.Entity)()
], React);
exports.default = React;
//# sourceMappingURL=react.model.js.map