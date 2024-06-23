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
const s3_2 = require("../../s3");
class UserManagementService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getAllInfor(page, results) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * results;
            const [users, total] = yield this.manager.findAndCount(user_model_1.default, {
                skip: skip,
                take: results,
                order: {
                    id: "DESC",
                },
            });
            const userPromises = users.map((user) => __awaiter(this, void 0, void 0, function* () {
                if (user.avatar)
                    user.avatar = yield (0, s3_1.getObjectSignedUrl)(user.avatar);
                return user;
            }));
            const usersDataReturn = yield Promise.all(userPromises);
            return {
                usersDataReturn,
                total,
            };
        });
    }
    updateUser(userData, file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (file) {
                if (userData.avatar) {
                    yield (0, s3_2.deleteFile)(userData.avatar);
                }
                userData.avatar = yield (0, s3_2.uploadFile)(file.buffer, file.mimetype);
            }
            yield this.manager.update(user_model_1.default, userData.id, userData);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.manager.delete(user_model_1.default, id);
        });
    }
}
exports.default = UserManagementService;
//# sourceMappingURL=userManagement.service.js.map