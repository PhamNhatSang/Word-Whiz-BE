import { manager } from './../../database';
import test from "node:test";
import User from "../../models/user.model";
import { BaseService } from "../base/base.service";
export default class RankingService extends BaseService {
    constructor() {
        super();
    }
    
    async getTopRanking() {
      const users = await this.manager.find(User, { relations: ["myTests"] });
      users.sort((a, b) => b.myTests.map(test=>test.score).reduce((acc,score)=>acc + score, 0) - a.myTests.map(test=>test.score).reduce((acc,score)=>acc + score, 0));
      return users.slice(0, 20);
    }
    
   
    }