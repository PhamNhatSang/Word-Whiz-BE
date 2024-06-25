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
require("reflect-metadata");
const base_service_1 = require("../base/base.service");
const user_model_1 = __importDefault(require("../../models/user.model"));
const s3_1 = require("../../s3");
class AuthService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manager.findOne(user_model_1.default, { where: { email } });
        });
    }
    getAllInfor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, { where: { id }, relations: { myGroups: true, myCourses: true, addedGroups: true } });
            if (user.avatar)
                user.avatar = yield (0, s3_1.getObjectSignedUrl)(user.avatar);
            return user;
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map