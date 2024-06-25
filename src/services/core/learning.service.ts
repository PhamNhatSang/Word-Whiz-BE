import User from "../../models/user.model";
import Learning from "../../models/learning.model";
import { BaseService } from "../base/base.service";
import Course from "../../models/course.model";
import Test from "../../models/test.model";
import { shuffleArray } from "../../utils/shuffle";
import TestItem from "../../models/testItem.model";
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
      courseName: learn.course.title,
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

  async createTest(userId: number, courseId: number) {
    let test = await this.manager.findOne(Test, {
      where: { user: { id: userId }, course: { id: courseId }, isDone: false },
      relations: { testItems: { word: true }, course: true },
    });
   

    if (!test) {

      const course = await this.manager.findOne(Course, {
        where: { id: courseId },
        relations: ["words"],
      });
      const user = await this.manager.findOne(User, { where: { id: userId } });
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

        testItem.word = word
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

    const listTestItems = test.testItems.map((item) => {
       
      const itemData = { ...item, question: item.word.term };
      delete itemData.word;
      return itemData;
    });
    listTestItems.sort((a, b) => a.id - b.id);
    const testData = { ...test,listTestItems:listTestItems, courseName: test.course.title };
    delete testData.course;
    delete testData.user;
    delete testData.testItems;
   
    return testData;
  }

  async submitTest(testId: number) {
    const test = await this.manager.findOne(Test, {
      where: { id: testId },
      relations: {testItems:{word:true}},
    });
    let scorePass = 0;
    test.testItems.forEach((item) => {
      if (item.user_answer === item.word.definition) {
        scorePass += 100;
      }
    });
    test.score = scorePass;
    test.isDone = true;
    const testResult = await this.manager.getRepository(Test).save(test);
    const numberOfCorrectAnswer = scorePass / 100;
    const numberOfWrong = test.testItems.length - numberOfCorrectAnswer;
    const percentage = parseFloat(
      ((numberOfCorrectAnswer / test.testItems.length) * 100).toFixed(2)
    );
    const listTestItem = testResult.testItems.map((item) => {
      const itemData = { ...item, question: item.word.term, correct_answer: item.word.definition};
      delete itemData.word;
      return itemData;
    })
    return {
      overall: {
        numberOfCorrectAnswer,
        numberOfWrong,
        percentage,
        score: scorePass,
      },
      listTestItems: listTestItem.sort((a, b) => a.id - b.id)
    };
  }
}
