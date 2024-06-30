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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_middleware_1 = require("../middlewares/upload.middleware");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const routing_controllers_1 = require("routing-controllers");
const community_service_1 = __importDefault(require("../services/core/community.service"));
const dependencyInject_1 = require("../dependencyInject");
let CommunityController = class CommunityController {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                const userId = req.body.currentUserData.id;
                const listCourseId = req.body.listCourseId
                    ? req.body.listCourseId.split(",").map((id) => parseInt(id))
                    : [];
                const content = req.body.content;
                const result = yield this.communityService.createPost(parseInt(userId), listCourseId, file, content);
                console.log(result);
                return res.send(result);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const postId = req.body.postId;
                const content = req.body.content;
                const result = yield this.communityService.createComment(parseInt(userId), parseInt(postId), content);
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    likePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const postId = req.params.id;
                const isLiked = req.body.isLiked;
                const result = yield this.communityService.reactPost(parseInt(userId), isLiked, parseInt(postId));
                return res.send(result);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    getCommunities(page, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const result = yield this.communityService.getCommunities(parseInt(userId), page);
                return res.send(result);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.id;
                const result = yield this.communityService.getComments(parseInt(postId));
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.id;
                const userId = req.body.currentUserData.id;
                const result = yield this.communityService.deletePost(parseInt(userId), parseInt(postId));
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
};
__decorate([
    dependencyInject_1.InjectCommunityService,
    __metadata("design:type", community_service_1.default)
], CommunityController.prototype, "communityService", void 0);
__decorate([
    (0, routing_controllers_1.Post)("/post"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "createPost", null);
__decorate([
    (0, routing_controllers_1.Post)("/post/comment"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "createComment", null);
__decorate([
    (0, routing_controllers_1.Post)("/post/like/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "likePost", null);
__decorate([
    (0, routing_controllers_1.Get)("/"),
    __param(0, (0, routing_controllers_1.QueryParam)("page")),
    __param(1, (0, routing_controllers_1.Req)()),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getCommunities", null);
__decorate([
    (0, routing_controllers_1.Get)("/post/comment/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getComments", null);
__decorate([
    (0, routing_controllers_1.Delete)("/post/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "deletePost", null);
CommunityController = __decorate([
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_1.UseBefore)(upload_middleware_1.UploadMidleware),
    (0, routing_controllers_1.Controller)("/community")
], CommunityController);
exports.default = CommunityController;
//# sourceMappingURL=community.controller.js.map