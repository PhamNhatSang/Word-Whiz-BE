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
                    ...user.myTests.map((test) => test.course ? test.course.id : null).filter(Boolean),
                    ...user.learnings.map((learning) => learning.course ? learning.course.id : null).filter(Boolean),
                ];
                courseLearned = [...new Set(courseLearned)];
                let totalScore = 0;
                let earliestScores = new Map();
                if (user.myTests && user.myTests.length > 0) {
                    user.myTests.forEach((item) => {
                        let updatedAtDate = new Date(item.updatedAt);
                        if (item.course && !earliestScores.has(item.course.id)) {
                            earliestScores.set(item.course.id, item);
                        }
                        else if (item.course) {
                            let existingItem = earliestScores.get(item.course.id);
                            let existingUpdatedAtDate = new Date(existingItem.updatedAt);
                            if (updatedAtDate < existingUpdatedAtDate) {
                                earliestScores.set(item.course.id, item);
                            }
                        }
                    });
                    totalScore = Array.from(earliestScores.values()).reduce((sum, item) => sum + item.score, 0);
                }
                const imageUrl = user.avatar ? yield (0, s3_1.getObjectSignedUrl)(user.avatar) : null;
                return {
                    user_id: user.id,
                    name: user.name,
                    avatar: imageUrl,
                    courseLearned: courseLearned.length,
                    totalScore,
                };
            }));
            const userData = yield Promise.all(userPromises);
            const userResult = userData.sort((a, b) => b.totalScore - a.totalScore);
            return userResult.slice(0, 20);
        });
    }
}
exports.default = RankingService;
//# sourceMappingURL=ranking.services.js.map