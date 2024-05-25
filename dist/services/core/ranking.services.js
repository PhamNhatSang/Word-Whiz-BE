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
class RankingService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getTopRanking() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.manager.find(user_model_1.default, { relations: ["myTests"] });
            users.sort((a, b) => b.myTests.map(test => test.score).reduce((acc, score) => acc + score, 0) - a.myTests.map(test => test.score).reduce((acc, score) => acc + score, 0));
            return users.slice(0, 20);
        });
    }
}
exports.default = RankingService;
//# sourceMappingURL=ranking.services.js.map