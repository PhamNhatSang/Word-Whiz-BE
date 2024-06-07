import { manager } from "./../../database";
import test from "node:test";
import User from "../../models/user.model";
import { BaseService } from "../base/base.service";
import { getObjectSignedUrl } from "../../s3";
export default class RankingService extends BaseService {
  constructor() {
    super();
  }

  async getTopRanking() {
    const users = await this.manager.find(User, {
      relations: ["myTests", "learnings"],
    });
    const userPromises = users.map(async (user) => {
      let courseLearned = [
        ...user.myTests.map((test) => {if (test.course) return test.course.id}),
        ...user.learnings.map((learning) => {if(learning.course) return learning.course.id}),
      ];
      courseLearned = [...new Set(courseLearned)];
      let totalScore=0;
      let earliestScores = new Map();
      if(user.myTests.length > 0) {
      user.myTests.forEach((item) => {
        let updatedAtDate = new Date(item.updatedAt);

        if (!earliestScores.has(item?.course?.id)) {
          earliestScores.set(item?.course?.id, item);
        } else {
          let existingItem = earliestScores.get(item?.course?.id);
          let existingUpdatedAtDate = new Date(existingItem.updatedAt);

          if (updatedAtDate < existingUpdatedAtDate) {
            earliestScores.set(item?.course?.id, item);
          }
        }
      });

       totalScore = Array.from(earliestScores.values()).reduce(
        (sum, item) => sum + item.score,
        0
      );
    }

      const imageUrl = await getObjectSignedUrl(user.avatar);
      return {
        user_id: user.id,
        name: user.name,
        avatar: imageUrl,
        courseLearned: courseLearned.length,
        totalScore
      };
    });

    const userData = await Promise.all(userPromises);
    const userResult = userData.sort((a, b) => b.totalScore - a.totalScore);
    return userResult.slice(0, 20);
  }
}
