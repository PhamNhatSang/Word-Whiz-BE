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
const courseDetail_service_1 = __importDefault(require("../services/core/courseDetail.service"));
const word_model_1 = __importDefault(require("../models/word.model"));
let CourseDetailController = class CourseDetailController extends baseController_1.BaseController {
    constructor() {
        super(new courseDetail_service_1.default());
    }
    getCourseDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                const userId = req.body.currentUserData.id;
                const result = yield this.service.getCourseDetail(parseInt(userId), parseInt(courseId));
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    addWord(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.body.courseId;
                const words = req.body.words;
                yield this.service.createWord(parseInt(courseId), words);
                return res.send("Add word successfully");
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    deleteWord(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wordId = req.params.id;
                const deleteWordId = yield this.service.delete(word_model_1.default, parseInt(wordId));
                return res.send(deleteWordId);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = req.body.course;
                const wordUpdated = yield this.service.updateCourse(course);
                return res.send(wordUpdated);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseDetailController.prototype, "getCourseDetail", null);
__decorate([
    (0, routing_controllers_1.Post)("/word"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseDetailController.prototype, "addWord", null);
__decorate([
    (0, routing_controllers_1.Delete)("/word/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseDetailController.prototype, "deleteWord", null);
__decorate([
    (0, routing_controllers_1.Put)("/"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseDetailController.prototype, "updateCourse", null);
CourseDetailController = __decorate([
    (0, routing_controllers_1.Controller)("/course"),
    __metadata("design:paramtypes", [])
], CourseDetailController);
exports.default = CourseDetailController;
//# sourceMappingURL=courseDetail.controller.js.map