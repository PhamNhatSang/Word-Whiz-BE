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
const user_model_1 = __importDefault(require("../models/user.model"));
const baseController_1 = require("./baseController");
const generateTokens_1 = require("../utils/generateTokens");
const routing_controllers_1 = require("routing-controllers");
const auth_service_1 = __importDefault(require("../services/auth/auth.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let Authcontroller = class Authcontroller extends baseController_1.BaseController {
    constructor() {
        super(new auth_service_1.default());
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.service.getByEmail(req.body.email);
            if (user) {
                throw new routing_controllers_1.BadRequestError("User already exists");
            }
            const hash = bcrypt_1.default.hashSync(req.body.password, 10);
            const newUser = yield this.service.create(user_model_1.default, {
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role: req.body.role,
            });
            return res.send(newUser);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.service.getByEmail(req.body.email);
            if (!user) {
                throw new routing_controllers_1.UnauthorizedError("Invalid email or password");
            }
            const isValidPass = bcrypt_1.default.compareSync(req.body.password, user.password);
            if (!isValidPass) {
                throw new routing_controllers_1.UnauthorizedError("Invalid email or password");
            }
            const accessToken = yield (0, generateTokens_1.generateAccessToken)({
                id: user.id,
                email: user.email,
                role: user.role,
            });
            const refreshToken = yield (0, generateTokens_1.generateRefreshToken)({
                id: user.id,
                email: user.email,
                role: user.role,
            });
            user.refeshToken = refreshToken;
            yield this.service.update(user_model_1.default, user);
            return res.send({ accessToken, refreshToken });
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.body.refreshToken;
            if (!refreshToken) {
                throw new routing_controllers_1.BadRequestError("Invalid refresh token");
            }
            try {
                const payload = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
                const user = yield this.service.getById(user_model_1.default, payload.id);
                if (!user || user.refeshToken !== refreshToken) {
                    throw new routing_controllers_1.BadRequestError("Invalid refresh token");
                }
                const token = yield (0, generateTokens_1.generateAccessToken)({
                    id: payload.id,
                    role: payload.role,
                });
                return res.send(token);
            }
            catch (err) {
                throw new routing_controllers_1.BadRequestError("Invalid Expired Time");
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/register"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "register", null);
__decorate([
    (0, routing_controllers_1.Post)("/login"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "login", null);
__decorate([
    (0, routing_controllers_1.Get)("/refresh"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "refresh", null);
Authcontroller = __decorate([
    (0, routing_controllers_1.JsonController)("/auth"),
    __metadata("design:paramtypes", [])
], Authcontroller);
exports.default = Authcontroller;
//# sourceMappingURL=auth.controller.js.map