import { Container } from './container'

export function InjectAuthService(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        value: Container.authService
    });
}

export function InjectCommunityService(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        value: Container.communityService
    });
}

export function InjectGroupService(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        value: Container.groupService
    });
}

export function InjectLibraryService(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        value: Container.libraryService
    });
}

export function InjectRankingService(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        value: Container.rankingService
    });
}

export function InjectCourseDetailService(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        value: Container.courseDetailService
    });
}

export function InjectHomeService(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        value: Container.homeService
    });
}
export function InjectLearningService(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        value: Container.learningService
    });
}
export function InjectUserManagementService(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        value: Container.userManagementService
    });
}

export function InjectPostManagementService(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        value: Container.postManagementService
    });
}


