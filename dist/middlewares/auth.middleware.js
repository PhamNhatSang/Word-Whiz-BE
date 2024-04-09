"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routing_controllers_1 = require("routing-controllers");
let AuthMiddleware = class AuthMiddleware {
    use(request, response, next) {
        const url = request.originalUrl.split("/");
        if (url[2] === "auth") {
            return next();
        }
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new routing_controllers_1.UnauthorizedError("Token not provided");
        }
        const parts = authHeader.split(" ");
        if (parts.length !== 2) {
            throw new routing_controllers_1.UnauthorizedError("Token error");
        }
        const [scheme, token] = parts;
        if (!/^Bearer$/i.test(scheme)) {
            throw new routing_controllers_1.UnauthorizedError("Token malformatted");
        }
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                throw new routing_controllers_1.UnauthorizedError("Token invalid");
            }
            next();
        });
    }
};
AuthMiddleware = __decorate([
    (0, routing_controllers_1.Middleware)({ type: "before" })
], AuthMiddleware);
exports.default = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map