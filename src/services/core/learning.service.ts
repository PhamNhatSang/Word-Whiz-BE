import { test } from "node:test";
import User from "../../models/user.model";
import Learning from "../../models/learning.model";
import { BaseService } from "../base/base.service";
import Course from "../../models/course.model";
import Test from "../../models/test.model";
import { shuffleArray } from "../../utils/shuffle";
import TestItem from "../../models/testItem.model";
import { Answer } from "../../type/DefineType";
export default class LearningService extends BaseService {
  constructor() {
    super();
  }

  async getOrCreateFLashCardLearningByUserId(
    userId: number,
    courseId: number
  ): Promise<Learning> {
    const learn = this.manager.findOne(Learning, {
      where: { user: { id: userId }, course: { id: courseId } },
    });

    if (!learn) {
      const user = await this.manager.findOne(User, { where: { id: userId } });
      const course = await this.manager.findOne(Course, {
        where: { id: courseId },
      });
      const learning = new Learning();
      learning.user = user;
      learning.course = course;
      return await this.manager.getRepository(Learning).save(learning);
    }

    return learn;
  }

  async updateLearning(
    learnerId: number,
    lastWordIndex: number
  ): Promise<void> {
    await this.manager
      .getRepository(Learning)
      .update(learnerId, { lastWordIndex: lastWordIndex });
  }

  async createTest(userId: number, courseId: number): Promise<Test> {
    let test = await this.manager.findOne(Test, {
      where: { user: { id: userId }, course: { id: courseId } },
    });
    const course = await this.manager.findOne(Course, {
      where: { id: courseId },
      relations: ["words"],
    });
    const user = await this.manager.findOne(User, { where: { id: userId } });

    if (!test) {
      const testCreate = new Test();
      testCreate.user = user;
      testCreate.course = course;
      test = await this.manager.getRepository(Test).save(testCreate);
    }
    await this.manager.getRepository(TestItem).clear();

    const listWord = course.words;
    const listTestItem = course.words.map((word) => {
      const testItem = new TestItem();
      const otherDefinitions = listWord
        .filter((td) => td.term !== word.term)
        .map((td) => td.definition);
      const shuffledDefinitions = shuffleArray(otherDefinitions);
      const options = [
        shuffledDefinitions[0] || "",
        shuffledDefinitions[1] || "",
        shuffledDefinitions[2] || "",
        word.definition,
      ];
      const shuffledOptions = shuffleArray(options);

      testItem.question = word.term;
      testItem.correctAnswer = word.definition;
      testItem.option_1 = shuffledOptions[0];
      testItem.option_2 = shuffledOptions[1];
      testItem.option_3 = shuffledOptions[2];
      testItem.option_4 = shuffledOptions[3];
      testItem.test = test;
      return testItem;
    });
     await this.manager.getRepository(TestItem).save(listTestItem);
     
     const testData=  await this.manager.findOne(Test,{where:{id:test.id},relations:['testItems']})
     testData.testItems.forEach((item)=>{
       delete item.correctAnswer;
      })
      return testData;

  }

  async submitTest(answers:Answer[],testId:number):Promise<Test>{
    const test = await this.manager.findOne(Test,{
      where:{id:testId},
      relations:['testItems']
    });
    console.log(test);
    let scorePass=0;
    const correctAnswers = test.testItems.map((item)=>item.correctAnswer);
    answers.forEach((answer,index)=>{
        if(answer.answer === correctAnswers[index]){
            if(!test.isFirstDone)
            scorePass+=100;
        }
        })
    test.score = scorePass;
    test.isFirstDone = true;
    return await this.manager.getRepository(Test).save(test);
  }

}
