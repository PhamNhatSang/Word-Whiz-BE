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
const dependencyInject_1 = require("../dependencyInject");
const userManagement_service_1 = __importDefault(require("../services/admin/userManagement.service"));
const postManagement_service_1 = __importDefault(require("../services/admin/postManagement.service"));
const upload_middleware_1 = require("../middlewares/upload.middleware");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
let Authcontroller = class Authcontroller {
    getAllInfor(page, results, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userManagerService.getAllInfor(page, results);
                return res.send(result);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                let userData = { id: req.body.id, name: req.body.name, email: req.body.email, role: req.body.role };
                const result = yield this.userManagerService.updateUser(userData, file);
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.userManagerService.deleteUser(parseInt(id));
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    getAllPosts(page, results, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.postManagementService.getAllPost(page, results);
                return res.send(result);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.postManagementService.deletePost(parseInt(id));
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
};
__decorate([
    dependencyInject_1.InjectUserManagementService,
    __metadata("design:type", userManagement_service_1.default)
], Authcontroller.prototype, "userManagerService", void 0);
__decorate([
    dependencyInject_1.InjectPostManagementService,
    __metadata("design:type", postManagement_service_1.default)
], Authcontroller.prototype, "postManagementService", void 0);
__decorate([
    (0, routing_controllers_1.Authorized)("ADMIN"),
    (0, routing_controllers_1.Get)("/users"),
    __param(0, (0, routing_controllers_1.QueryParam)("page")),
    __param(1, (0, routing_controllers_1.QueryParam)("results")),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "getAllInfor", null);
__decorate([
    (0, routing_controllers_1.Authorized)("ADMIN"),
    (0, routing_controllers_1.Put)("/user"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "updateUser", null);
__decorate([
    (0, routing_controllers_1.Authorized)("ADMIN"),
    (0, routing_controllers_1.Delete)("/user/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "deleteUser", null);
__decorate([
    (0, routing_controllers_1.Authorized)("ADMIN"),
    (0, routing_controllers_1.Get)("/posts"),
    __param(0, (0, routing_controllers_1.QueryParam)("page")),
    __param(1, (0, routing_controllers_1.QueryParam)("results")),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "getAllPosts", null);
__decorate([
    (0, routing_controllers_1.Authorized)("ADMIN"),
    (0, routing_controllers_1.Delete)("/post/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "deletePost", null);
Authcontroller = __decorate([
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_1.UseBefore)(upload_middleware_1.UploadMidleware),
    (0, routing_controllers_1.Controller)("/admin")
], Authcontroller);
exports.default = Authcontroller;
//# sourceMappingURL=admin.controller.js.map