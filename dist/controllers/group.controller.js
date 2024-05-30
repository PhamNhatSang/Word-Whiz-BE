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
const baseController_1 = require("./baseController");
const routing_controllers_1 = require("routing-controllers");
const group_service_1 = __importDefault(require("../services/core/group.service"));
let GroupController = class GroupController extends baseController_1.BaseController {
    constructor() {
        super(new group_service_1.default());
    }
    getListGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.service.getAllGroup(parseInt(req.body.currentUserData.id));
                return res.send(result);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    getCoursesInGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = req.params.id;
                console.log(groupId);
                const result = yield this.service.getCourseInGroup(parseInt(groupId));
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    createGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = req.body;
                const userId = req.body.currentUserData.id;
                yield this.service.createGroup(parseInt(userId), group);
                return res.send("Create group successfully");
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    deleteGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const groupId = req.params.id;
                yield this.service.deleteGroup(parseInt(userId), parseInt(groupId));
                return res.send("Delete group successfully");
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    addStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = req.body.groupId;
                const emails = req.body.emails;
                const group = yield this.service.addStudent(parseInt(groupId), emails);
                return res.send(group);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    removeStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = req.body.groupId;
                const email = req.body.email;
                console.log(email, groupId);
                const group = yield this.service.removeStudent(parseInt(groupId), email);
                return res.send(group);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    addCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const groupId = req.body.groupId;
                const courseId = req.body.courseId;
                const group = yield this.service.addCourseToGroup(parseInt(groupId), parseInt(userId), parseInt(courseId));
                return res.send(group);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    removeCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const groupId = req.body.groupId;
                const courseId = req.body.courseId;
                const group = yield this.service.removeCourseFromGroup(parseInt(groupId), parseInt(courseId));
                return res.send(group);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getListGroup", null);
__decorate([
    (0, routing_controllers_1.Get)("/:id/courses"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getCoursesInGroup", null);
__decorate([
    (0, routing_controllers_1.Post)("/"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "createGroup", null);
__decorate([
    (0, routing_controllers_1.Delete)("/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "deleteGroup", null);
__decorate([
    (0, routing_controllers_1.Post)("/student"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "addStudent", null);
__decorate([
    (0, routing_controllers_1.Put)("/student"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "removeStudent", null);
__decorate([
    (0, routing_controllers_1.Post)("/course"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "addCourse", null);
__decorate([
    (0, routing_controllers_1.Put)("/course"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "removeCourse", null);
GroupController = __decorate([
    (0, routing_controllers_1.Controller)("/group"),
    __metadata("design:paramtypes", [])
], GroupController);
exports.default = GroupController;
//# sourceMappingURL=group.controller.js.map