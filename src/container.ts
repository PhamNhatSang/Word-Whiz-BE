import CommunityService from './services/core/community.service';
import GroupService from './services/core/group.service';
import LibraryService from './services/core/library.service';
import RankingService from './services/core/ranking.services';
import CourseDetailService from './services/core/courseDetail.service';
import AuthService from './services/auth/auth.service';
import HomeService from './services/core/home.service';
import LearningService from './services/core/learning.service';
export const Container = {
    authService: new AuthService(),
    communityService: new CommunityService(),
    groupService: new GroupService(),
    libraryService: new LibraryService(),
    rankingService: new RankingService(),
    courseDetailService: new CourseDetailService(),
    homeService: new HomeService(),
    learningService: new LearningService()

};
