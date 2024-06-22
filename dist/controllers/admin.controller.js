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
                2;
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userManagerService.updateUser(req.body);
                return res.send(result);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    deleteUser(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userManagerService.deleteUser(id);
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
    (0, routing_controllers_1.Authorized)("ADMIN"),
    (0, routing_controllers_1.Get)("/user-infor"),
    __param(0, (0, routing_controllers_1.QueryParam)("page")),
    __param(1, (0, routing_controllers_1.QueryParam)("results")),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "getAllInfor", null);
__decorate([
    (0, routing_controllers_1.Authorized)("ADMIN"),
    (0, routing_controllers_1.Put)("/update-user"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "updateUser", null);
__decorate([
    (0, routing_controllers_1.Authorized)("ADMIN"),
    (0, routing_controllers_1.Delete)("/delete-user"),
    __param(0, (0, routing_controllers_1.QueryParam)("id")),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "deleteUser", null);
Authcontroller = __decorate([
    (0, routing_controllers_1.Controller)("/admin")
], Authcontroller);
exports.default = Authcontroller;
//# sourceMappingURL=admin.controller.js.map