"use strict";
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
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (dataPayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = jsonwebtoken_1.default.sign(dataPayload, process.env.ACCESS_SECRET_KEY, {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: "30d",
        });
        return Promise.resolve(accessToken);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = jsonwebtoken_1.default.sign(userData, process.env.REFRESH_SECRET_KEY, {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: "30d",
        });
        return Promise.resolve(refreshToken);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=generateTokens.js.map