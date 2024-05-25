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
const home_service_1 = __importDefault(require("../services/core/home.service"));
const courseDetail_service_1 = __importDefault(require("../services/core/courseDetail.service"));
let HomeController = class HomeController extends baseController_1.BaseController {
    constructor() {
        super(new home_service_1.default());
        this.courseDetailService = new courseDetail_service_1.default();
    }
    getHome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topCourse = yield this.service.getTopCourse();
                const newCourse = yield this.service.getNewCourse();
                const continueCourse = yield this.service.getContinueCourse(req.body.currentUserData.id);
                return res.send({ topCourse, newCourse, continueCourse });
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    searchCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const title = req.query.title;
                const course = this.service.getCourseByTitle(title);
                return res.send(course);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    importCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const courseId = req.params.id;
                yield this.service.importCourse(userId, parseInt(courseId));
                return res.send("Import course successfully");
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
], HomeController.prototype, "getHome", null);
__decorate([
    (0, routing_controllers_1.Get)("/search"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "searchCourse", null);
__decorate([
    (0, routing_controllers_1.Post)("/import/course/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "importCourse", null);
HomeController = __decorate([
    (0, routing_controllers_1.Controller)("/home"),
    __metadata("design:paramtypes", [])
], HomeController);
exports.default = HomeController;
//# sourceMappingURL=home.controller.js.map