import User from "../../models/user.model";
import { BaseService } from "../base/base.service";
import { getObjectSignedUrl } from "../../s3";

export default class RankingService extends BaseService {
  constructor() {
    super();
  }

  async getTopRanking() {
    const users = await this.manager.find(User, {
      relations:{myTests:{course:true},learnings:{course:true}},
    });

    const userPromises = users.map(async (user) => {
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
          } else if (item.course) {
            let existingItem = earliestScores.get(item.course.id);
            let existingUpdatedAtDate = new Date(existingItem.updatedAt);

            if (updatedAtDate < existingUpdatedAtDate) {
              earliestScores.set(item.course.id, item);
            }
          }
        });

        totalScore = Array.from(earliestScores.values()).reduce(
          (sum, item) => sum + item.score,
          0
        );
      }

      const imageUrl = user.avatar ? await getObjectSignedUrl(user.avatar) : null;

      return {
        user_id: user.id,
        name: user.name,
        avatar: imageUrl,
        courseLearned: courseLearned.length,
        totalScore,
      };
    });

    const userData = await Promise.all(userPromises);
    const userResult = userData.sort((a, b) => b.totalScore - a.totalScore);
    return userResult.slice(0, 20);
  }
}
