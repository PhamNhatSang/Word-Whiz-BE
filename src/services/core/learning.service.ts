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

  async getOrCreateFLashCardLearningByUserId(userId: number, courseId: number) {
    let learn = await this.manager.findOne(Learning, {
      where: { user: { id: userId }, course: { id: courseId } },
      relations: { course: { words: true } },
    });
    if (!learn) {
      const user = await this.manager.findOne(User, { where: { id: userId } });
      const course = await this.manager.findOne(Course, {
        where: { id: courseId },
        relations: ["words"],
      });
      const learning = new Learning();
      learning.user = user;
      learning.course = course;
      learn = await this.manager.getRepository(Learning).save(learning);
    }

    const myLearning = {
      ...learn,
      courseId: courseId,
      userId: userId,
      words: learn.course.words,
    };
    delete myLearning.course;
    delete myLearning.user;

    return myLearning;
  }

  async updateLearning(learnId: number, lastWordIndex: number): Promise<void> {
    await this.manager
      .getRepository(Learning)
      .update(learnId, { lastWordIndex: lastWordIndex });
  }
  async updateTestItem(testItemId: number, userAnswer: string): Promise<void> {
    await this.manager
      .getRepository(TestItem)
      .update(testItemId, { user_answer: userAnswer });
  }


  async createTest(userId: number, courseId: number): Promise<Test> {
    let test = await this.manager.findOne(Test, {
      where: { user: { id: userId }, course: { id: courseId } },
      relations: ["testItems"],
    });
    const course = await this.manager.findOne(Course, {
      where: { id: courseId },
      relations: ["words"],
    });
    const user = await this.manager.findOne(User, { where: { id: userId } });

    if (!test) {


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
        testItem.correct_answer = word.definition;
        testItem.option_1 = shuffledOptions[0];
        testItem.option_2 = shuffledOptions[1];
        testItem.option_3 = shuffledOptions[2];
        testItem.option_4 = shuffledOptions[3];
        return testItem;
      });
      const testCreate = new Test();
      testCreate.user = user;
      testCreate.course = course;
      testCreate.testItems = listTestItem;
      test = await this.manager.getRepository(Test).save(testCreate);
    }


    if(test.isDone){  
      await this.manager.getRepository(TestItem).remove(test.testItems);

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
        testItem.correct_answer = word.definition;
        testItem.option_1 = shuffledOptions[0];
        testItem.option_2 = shuffledOptions[1];
        testItem.option_3 = shuffledOptions[2];
        testItem.option_4 = shuffledOptions[3];
        return testItem;
      });

      test.testItems = listTestItem;
      test.isDone = false;
      test = await this.manager.getRepository(Test).save(test);
    }
    
    test.testItems = test.testItems.map((item) => {
      delete item.correct_answer;
      return item;
    });
    delete test.user;
    delete test.course;
    return test;
  }

  async submitTest(answers: Answer[], testId: number): Promise<Test> {
    const test = await this.manager.findOne(Test, {
      where: { id: testId },
      relations: ["testItems"],
    });
    let scorePass = 0;
    const correctAnswers = test.testItems.map((item) => item.correct_answer);
    answers.forEach((answer, index) => {
      if (answer.answer === correctAnswers[index]) {
        if (test.score === -1) scorePass += 100;
      }
    });
    test.score = scorePass;
    test.isDone = true;
    return await this.manager.getRepository(Test).save(test);
  }
}
