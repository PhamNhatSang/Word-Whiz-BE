"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectLearningService = exports.InjectHomeService = exports.InjectCourseDetailService = exports.InjectRankingService = exports.InjectLibraryService = exports.InjectGroupService = exports.InjectCommunityService = exports.InjectAuthService = void 0;
const container_1 = require("./container");
function InjectAuthService(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        value: container_1.Container.authService
    });
}
exports.InjectAuthService = InjectAuthService;
function InjectCommunityService(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        value: container_1.Container.communityService
    });
}
exports.InjectCommunityService = InjectCommunityService;
function InjectGroupService(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        value: container_1.Container.groupService
    });
}
exports.InjectGroupService = InjectGroupService;
function InjectLibraryService(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        value: container_1.Container.libraryService
    });
}
exports.InjectLibraryService = InjectLibraryService;
function InjectRankingService(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        value: container_1.Container.rankingService
    });
}
exports.InjectRankingService = InjectRankingService;
function InjectCourseDetailService(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        value: container_1.Container.courseDetailService
    });
}
exports.InjectCourseDetailService = InjectCourseDetailService;
function InjectHomeService(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        value: container_1.Container.homeService
    });
}
exports.InjectHomeService = InjectHomeService;
function InjectLearningService(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        value: container_1.Container.learningService
    });
}
exports.InjectLearningService = InjectLearningService;
//# sourceMappingURL=dependencyInject.js.map