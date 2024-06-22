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
const learning_service_1 = __importDefault(require("../services/core/learning.service"));
const dependencyInject_1 = require("../dependencyInject");
let LearningController = class LearningController {
    getFlashcard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const courseId = req.params.id;
                const result = yield this.learningService.getOrCreateFLashCardLearningByUserId(parseInt(userId), parseInt(courseId));
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    learningFlashcard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const learnId = req.body.learnId;
                const lastWordIndex = req.body.lastWordIndex;
                yield this.learningService.updateLearning(parseInt(learnId), parseInt(lastWordIndex));
                return res.send("Learning flashcard successfully");
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    startTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.currentUserData.id;
                const courseId = req.params.id;
                const result = yield this.learningService.createTest(parseInt(userId), parseInt(courseId));
                return res.send(result);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    submitTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testId = req.params.id;
                const result = yield this.learningService.submitTest(parseInt(testId));
                return res.send(result);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    updateTestItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testItemId = req.body.testItemId;
                const userAnswer = req.body.userAnswer;
                const result = yield this.learningService.updateTestItem(parseInt(testItemId), userAnswer);
                return res.send(result);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
};
__decorate([
    dependencyInject_1.InjectLearningService,
    __metadata("design:type", learning_service_1.default)
], LearningController.prototype, "learningService", void 0);
__decorate([
    (0, routing_controllers_1.Get)("/flashcard/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LearningController.prototype, "getFlashcard", null);
__decorate([
    (0, routing_controllers_1.Put)("/flashcard/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LearningController.prototype, "learningFlashcard", null);
__decorate([
    (0, routing_controllers_1.Post)("/test/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LearningController.prototype, "startTest", null);
__decorate([
    (0, routing_controllers_1.Put)("/test/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LearningController.prototype, "submitTest", null);
__decorate([
    (0, routing_controllers_1.Put)("/testItem"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LearningController.prototype, "updateTestItem", null);
LearningController = __decorate([
    (0, routing_controllers_1.Controller)("/learning")
], LearningController);
exports.default = LearningController;
//# sourceMappingURL=learning.controller.js.map