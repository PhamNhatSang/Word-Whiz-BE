"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const community_service_1 = __importDefault(require("./services/core/community.service"));
const group_service_1 = __importDefault(require("./services/core/group.service"));
const library_service_1 = __importDefault(require("./services/core/library.service"));
const ranking_services_1 = __importDefault(require("./services/core/ranking.services"));
const courseDetail_service_1 = __importDefault(require("./services/core/courseDetail.service"));
const auth_service_1 = __importDefault(require("./services/auth/auth.service"));
const home_service_1 = __importDefault(require("./services/core/home.service"));
const learning_service_1 = __importDefault(require("./services/core/learning.service"));
exports.Container = {
    authService: new auth_service_1.default(),
    communityService: new community_service_1.default(),
    groupService: new group_service_1.default(),
    libraryService: new library_service_1.default(),
    rankingService: new ranking_services_1.default(),
    courseDetailService: new courseDetail_service_1.default(),
    homeService: new home_service_1.default(),
    learningService: new learning_service_1.default()
};
//# sourceMappingURL=container.js.map