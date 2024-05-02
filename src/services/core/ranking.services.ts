import test from "node:test";
import User from "../../models/user.model";
import { BaseService } from "../base/base.service";
export default class RankingService extends BaseService<User> {
    constructor() {
        super(User);
    }
    
    async getTopRanking() {
      const users = await this.repository.find();
      users.sort((a, b) => b.myTests.map(test=>test.score).reduce((acc,score)=>acc + score, 0) - a.myTests.map(test=>test.score).reduce((acc,score)=>acc + score, 0));
      return users.slice(0, 20);
    }
    
   
    }