import { test } from 'node:test';
import User from "../../models/user.model";
import Learning from "../../models/learning.model";
import { BaseService } from "../base/base.service";
import Course from "../../models/course.model";
import Test from "../../models/test.model";
import { shuffleArray } from "../../utils/shuffle";
import TestItem from "../../models/testItem.model";
import Group from "../../models/group.model";
import TestGroup from "../../models/testGroup.model";
import FeedBack from '../../models/feedback.model';
import { getObjectSignedUrl } from "../../s3";

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
    } else {
      if (learn.isDone) {
        learn.isDone = false;
        await this.manager
          .getRepository(Learning)
          .update(learn.id, { isDone: false });
      }
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
    const learn = await this.manager.findOne(Learning, {
      where: { id: learnId },
      relations: { course: { words: true } },
    });

    if (lastWordIndex === learn.course.words.length - 1) {
      learn.isDone = true;
      learn.lastWordIndex = 0;
    } else {
      learn.isDone = false;
      learn.lastWordIndex = lastWordIndex;
    }
    await this.manager.getRepository(Learning).save(learn);
  }
  async updateTestItem(testItemId: number, userAnswer: string): Promise<void> {
    await this.manager
      .getRepository(TestItem)
      .update(testItemId, { user_answer: userAnswer });
  }

  async createTest(userId: number, courseId: number) {
    let test = await this.manager.findOne(Test, {
      where: {
        user: { id: userId },
        course: { id: courseId },
        isDone: false,
        testGroup: null,
      },
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

        testItem.word = word;
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
    const testData = { ...test, listTestItems: listTestItems,courseName:test.course.title };
    delete testData.course;
    delete testData.user;
    delete testData.testItems;

    return testData;
  }

  async createGroupTestDefault(
    groupId: number,
    courseId: number,
  ) {
    const groups = await this.manager.findOne(Group, {
      where: { id: groupId },
      relations: ["students"],
    });
    const listUser = groups.students;
    const course = await this.manager.findOne(Course, {
      where: { id: courseId },
      relations: ["words"],
    });
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

      testItem.word = word;
      testItem.option_1 = shuffledOptions[0];
      testItem.option_2 = shuffledOptions[1];
      testItem.option_3 = shuffledOptions[2];
      testItem.option_4 = shuffledOptions[3];
      return testItem;
    });
    const testCreate = new Test();
    testCreate.course = course;
    testCreate.testItems = listTestItem;
    let testData = []
    if(listUser.length===0){
       const test = await this.manager.getRepository(Test).save(testCreate);
       testData.push(test);
    
    }else{
    const testPromise = listUser.map(async (user) => {
      testCreate.user = user;
      const test = await this.manager.getRepository(Test).save(testCreate);
      return test;
    });
    testData= await Promise.all(testPromise);
  }

     
    const testGroup = new TestGroup();
    testGroup.group=groups;
    testGroup.tests=testData;
    testGroup.testName="Test for"+course.title;
    await this.manager.getRepository(TestGroup).save(testGroup);

    return {
      testGroupId: testGroup.id,
      testName: "Test for "+course.title,
      courseId: course.id,
    };
  }

  async createTestForGroup(
    groupId: number,
    courseId: number,
    testName: string,
    testItems: TestItem[]
  ) {
    const groups = await this.manager.findOne(Group, {
      where: { id: groupId },
      relations: ["students"],
    });
    const listUser = groups.students;
    const course = await this.manager.findOne(Course, {
      where: { id: courseId },
      relations: ["words"],
    });
    const testCreate = new Test();
    testCreate.course = course;
    testCreate.testItems = testItems;
    let testData = []
    if(listUser.length===0){
       const test = await this.manager.getRepository(Test).save(testCreate);
       testData.push(test);
    
    }else{
    const testPromise = listUser.map(async (user) => {
      testCreate.user = user;
      const test = await this.manager.getRepository(Test).save(testCreate);
      return test;
    });
    testData= await Promise.all(testPromise);
  }
    const testGroup = new TestGroup()
    testGroup.group=groups;
    testGroup.testName=testName;
    testGroup.tests=testData;
    const testGroupData = await this.manager.getRepository(TestGroup).save(testGroup);

    return {
      testGroupId: testGroupData.id,
      testName: testName,
      courseId: course.id,
    };
  }

  async createTestItemByTeacher(courseId: number) {
    const course = await this.manager.findOne(Course, {
      where: { id: courseId },
      relations: ["words"],
    });
    const listTestItem = course.words.map((word) => {
      const testItem = new TestItem();

      const options = ["", "", "", word.definition];
      const shuffledOptions = shuffleArray(options);

      testItem.word = word;
      testItem.option_1 = shuffledOptions[0];
      testItem.option_2 = shuffledOptions[1];
      testItem.option_3 = shuffledOptions[2];
      testItem.option_4 = shuffledOptions[3];
      return testItem;
    });

    return listTestItem;
  }

  async getTestByGroupId(groupId: number, studentId: number) {
    const testGroups = await this.manager.find(TestGroup, {
      where: { group: { id: groupId }},
      relations: { tests: { user: true } },
    });



    const listTest = testGroups.map((test) => (
      test.tests.map((item) => {
        if(item.user.id===studentId){
          return {
            testId: item.id,
            testName: test.testName,
            isDone: item.isDone,
          };
          }
        })

      
     
    )).flat();

    return listTest;}

  async getTestForTeacher(groupId: number) {
   const testGroups = await this.manager.find(TestGroup, {
      where: { group: { id: groupId }},
      relations:{tests:{user:true},group:{students:true}}
    });
  const group = await this.manager.findOne(Group, {
    where: { id: groupId },
    relations: ["students"],
  });
  

  
    const numberOfStudents = group.students.length;
    return testGroups.map((testGroup) => {

      const numberOfDone = testGroup.tests.filter((test) => test.isDone === true).length;
      return {
        testGroupId: testGroup.id,
        testName: testGroup.testName,
        numberOfDone: numberOfDone,
        numberOfStudents: numberOfStudents,
  }})
  }

  async getAllResultTestInGroup(testGroupId: number) {
    const testGroups = await this.manager.find(TestGroup, {
      where: { id: testGroupId },
      relations: { tests: { testItems: { word: true }, user: true }, group: { students: true } },
    });
    const tests = testGroups.map((testGroup) => testGroup.tests
      .map((test) => {
        if(test.isDone===true){
        const numberOfCorrectAnswer = test.testItems.filter((item) => item.user_answer === item.word.definition).length;
        const numberOfWrong = test.testItems.length - numberOfCorrectAnswer;
        const percentage = parseFloat(((numberOfCorrectAnswer / test.testItems.length) * 100).toFixed(2));
        const isStudentInGroup=testGroup.group.students.some((student)=>student.id===test.user.id);
        return {
          testId: test.id,
          testName: testGroup.testName,
          score: test.score,
          studentName: test.user.name,
          studentEmail: test.user.email,
          numberOfCorrectAnswer,
          numberOfWrong,
          status:isStudentInGroup,
          percentage,
        };
      }
      return null
      })
    ).flat()
    .filter(Boolean);
  
    return tests;
  }

  async getAllResult(userId:number){

    const tests = await this.manager.find(Test, {
      where: { user: { id: userId } },
      relations: { testItems: { word: true }, course: true,testGroup:true },
    });
    const listTest = tests.map((test) => {
      const numberOfCorrectAnswer = test.testItems.filter((item) => item.user_answer === item.word.definition).length;
      const numberOfWrong = test.testItems.length - numberOfCorrectAnswer;
      const percentage = parseFloat(((numberOfCorrectAnswer / test.testItems.length) * 100).toFixed(2));
      let testName=test.course.title;
      if(test.testGroup){
        testName=test.testGroup.testName;
      }

      return {
        testId: test.id,
        testName: testName,
        score: test.score,
        numberOfCorrectAnswer,
        numberOfWrong,
        percentage,
      };
    });

    return listTest;

  }

  async getTestDetail(testId: number) {
    const test = await this.manager.findOne(Test, {
      where: { id: testId },
      relations: { testItems: { word: true },course:true },
    });

    let testName=test.course.title;
    if(test.testGroup){
      testName=test.testGroup.testName;
    }
   
    const listTestItem = test.testItems.map((item) => {
      const itemData = { ...item, question: item.word.term };
      delete itemData.word;
      return itemData;
    });

    return {testName:testName,isDone:test.isDone,listTestItem:listTestItem.sort((a, b) => a.id - b.id)}
  }

  async getResultDetail(testId: number) {

    const test = await this.manager.findOne(Test, {
      where: { id: testId },
      relations: { testItems: { word: true },course:true },
    });
   let testName=test.course.title;
    if(test.testGroup){
      testName=test.testGroup.testName;
    }
    const numberOfCorrectAnswer = test.testItems.filter((item) => item.user_answer === item.word.definition).length;
    const numberOfWrong = test.testItems.length - numberOfCorrectAnswer;
    const percentage = parseFloat(((numberOfCorrectAnswer / test.testItems.length) * 100).toFixed(2));
    const listTestItem = test.testItems.map((item) => {
      const itemData = { ...item, question: item.word.term, correct_answer: item.word.definition };
      delete itemData.word;
      return itemData;
    });

    return {
      testName:testName,
      overall: {
        numberOfCorrectAnswer,
        numberOfWrong,
        percentage,
        score: test.score,
      },
      listTestItems: listTestItem.sort((a, b) => a.id - b.id),
    };
    }

    async feedbackTest(testId: number,groupId:number, content: string,userFbId:number) {
      const testGroup = await this.manager.findOne(TestGroup, {

        where: { id: groupId },
        relations: { tests: { user: true } },
      });
      const userFb = await this.manager.findOne(User, {
        where: { id: userFbId },
      });
      const test = testGroup.tests.find((test) => test.id === testId);
      const feedback = new FeedBack();
      feedback.user = userFb;
      feedback.content = content;
      feedback.test = test;
      await this.manager.getRepository(FeedBack).save(feedback);
    }

    async getFeedbackTest(testId: number) {

      const feedbacks = await this.manager.find(FeedBack, {
        where: { test: { id: testId } },
        relations: { user: true },
      });

      
      const listFeedbackPromise = feedbacks.map(async(feedback) => {
        if(feedback.user.avatar){
          feedback.user.avatar =  await getObjectSignedUrl(feedback.user.avatar);
        }
        return {
          feedbackId: feedback.id,
          userName: feedback.user.name,
          userAvatar: feedback.user.avatar,
          content: feedback.content,
        };
      });


      return await Promise.all(listFeedbackPromise);

    }






  async submitTest(testId: number) {
    const test = await this.manager.findOne(Test, {
      where: { id: testId },
      relations: { testItems: { word: true } },
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
      const itemData = {
        ...item,
        question: item.word.term,
        correct_answer: item.word.definition,
      };
      delete itemData.word;
      return itemData;
    });
    return {
      overall: {
        numberOfCorrectAnswer,
        numberOfWrong,
        percentage,
        score: scorePass,
      },
      listTestItems: listTestItem.sort((a, b) => a.id - b.id),
    };
  }
}
