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
const user_model_1 = __importDefault(require("../../models/user.model"));
const base_service_1 = require("../base/base.service");
const s3_1 = require("../../s3");
class RankingService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getTopRanking() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.manager.find(user_model_1.default, {
                relations: ["myTests", "learnings"],
            });
            const userPromises = users.map((user) => __awaiter(this, void 0, void 0, function* () {
                let courseLearned = [
                    ...user.myTests.map((test) => { if (test.course)
                        return test.course.id; }),
                    ...user.learnings.map((learning) => { if (learning.course)
                        return learning.course.id; }),
                ];
                courseLearned = [...new Set(courseLearned)];
                let totalScore = 0;
                let earliestScores = new Map();
                if (user.myTests.length > 0) {
                    user.myTests.forEach((item) => {
                        var _a, _b, _c, _d;
                        let updatedAtDate = new Date(item.updatedAt);
                        if (!earliestScores.has((_a = item === null || item === void 0 ? void 0 : item.course) === null || _a === void 0 ? void 0 : _a.id)) {
                            earliestScores.set((_b = item === null || item === void 0 ? void 0 : item.course) === null || _b === void 0 ? void 0 : _b.id, item);
                        }
                        else {
                            let existingItem = earliestScores.get((_c = item === null || item === void 0 ? void 0 : item.course) === null || _c === void 0 ? void 0 : _c.id);
                            let existingUpdatedAtDate = new Date(existingItem.updatedAt);
                            if (updatedAtDate < existingUpdatedAtDate) {
                                earliestScores.set((_d = item === null || item === void 0 ? void 0 : item.course) === null || _d === void 0 ? void 0 : _d.id, item);
                            }
                        }
                    });
                    totalScore = Array.from(earliestScores.values()).reduce((sum, item) => sum + item.score, 0);
                }
                const imageUrl = yield (0, s3_1.getObjectSignedUrl)(user.avatar);
                return {
                    user_id: user.id,
                    name: user.name,
                    avatar: imageUrl,
                    courseLearned: courseLearned.length,
                    totalScore
                };
            }));
            const userData = yield Promise.all(userPromises);
            return userData.slice(0, 20);
        });
    }
}
exports.default = RankingService;
//# sourceMappingURL=ranking.services.js.map