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
const base_controller_1 = require("./base-controller");
const routing_controllers_1 = require("routing-controllers");
const user_service_1 = __importDefault(require("../services/user.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let Authcontroller = class Authcontroller extends base_controller_1.BaseController {
    constructor() {
        super(new user_service_1.default());
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.service.getByEmail(req.body.email)).dataValues;
            if (!user) {
                throw new routing_controllers_1.UnauthorizedError("Invalid email or password");
            }
            const isValidPass = bcrypt_1.default.compareSync(req.body.password, user.password);
            if (!isValidPass) {
                throw new routing_controllers_1.UnauthorizedError("Invalid email or password");
            }
            const accessToken = jsonwebtoken_1.default.sign({ name: user.name, email: user.email, role: user.role }, process.env.SECRET_KEY, {
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                expiresIn: 60, // 24 hours
            });
            return res.send({ accessToken });
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/login"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Authcontroller.prototype, "login", null);
Authcontroller = __decorate([
    (0, routing_controllers_1.Controller)("/auth"),
    __metadata("design:paramtypes", [])
], Authcontroller);
exports.default = Authcontroller;
//# sourceMappingURL=auth.controller.js.map