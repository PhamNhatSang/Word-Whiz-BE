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
const routing_controllers_1 = require("routing-controllers");
const library_service_1 = __importDefault(require("../services/core/library.service"));
const dependencyInject_1 = require("../dependencyInject");
let LibraryController = class LibraryController {
    getLibrary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const result = yield this.libraryService.getAllCourse(parseInt(userId));
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const course = req.body;
                yield this.libraryService.createCourse(parseInt(userId), course);
                return res.send("Create course successfully");
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const courseId = req.params.id;
                yield this.libraryService.deleteCourse(parseInt(userId), parseInt(courseId));
                return res.send("Delete course successfully");
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    searchCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const title = req.query.title;
                const result = this.libraryService.getCourseByTitle(userId, title);
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    getCourseAddGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const groupId = req.params.id;
                const result = yield this.libraryService.getListCourseToAddGroup(parseInt(userId), parseInt(groupId));
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    getCourseAddPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const result = yield this.libraryService.getListCourseToAddPost(parseInt(userId));
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
};
__decorate([
    dependencyInject_1.InjectLibraryService,
    __metadata("design:type", library_service_1.default)
], LibraryController.prototype, "libraryService", void 0);
__decorate([
    (0, routing_controllers_1.Get)("/"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LibraryController.prototype, "getLibrary", null);
__decorate([
    (0, routing_controllers_1.Post)("/course"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LibraryController.prototype, "createCourse", null);
__decorate([
    (0, routing_controllers_1.Delete)("/course/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LibraryController.prototype, "deleteCourse", null);
__decorate([
    (0, routing_controllers_1.Get)("/search"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LibraryController.prototype, "searchCourse", null);
__decorate([
    (0, routing_controllers_1.Get)("/course-add-group/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LibraryController.prototype, "getCourseAddGroup", null);
__decorate([
    (0, routing_controllers_1.Get)("/course-add-post"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LibraryController.prototype, "getCourseAddPost", null);
LibraryController = __decorate([
    (0, routing_controllers_1.Controller)("/library")
], LibraryController);
exports.default = LibraryController;
//# sourceMappingURL=library.controller.js.map