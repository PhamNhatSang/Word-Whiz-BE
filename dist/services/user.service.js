"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const base_service_1 = require("./base.service");
const user_model_1 = __importDefault(require("../models/user.model"));
class UserService extends base_service_1.BaseService {
    constructor() {
        super(user_model_1.default);
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map