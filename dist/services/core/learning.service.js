"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user.model"));
const learning_model_1 = __importDefault(require("../../models/learning.model"));
const base_service_1 = require("../base/base.service");
const course_model_1 = __importDefault(require("../../models/course.model"));
const test_model_1 = __importDefault(require("../../models/test.model"));
const shuffle_1 = require("../../utils/shuffle");
const testItem_model_1 = __importDefault(require("../../models/testItem.model"));
const group_model_1 = __importDefault(require("../../models/group.model"));
const testGroup_model_1 = __importDefault(require("../../models/testGroup.model"));
const feedback_model_1 = __importDefault(require("../../models/feedback.model"));
const s3_1 = require("../../s3");
class LearningService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getOrCreateFLashCardLearningByUserId(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            let learn = yield this.manager.findOne(learning_model_1.default, {
                where: { user: { id: userId }, course: { id: courseId } },
                relations: { course: { words: true } },
            });
            if (!learn) {
                const user = yield this.manager.findOne(user_model_1.default, { where: { id: userId } });
                const course = yield this.manager.findOne(course_model_1.default, {
                    where: { id: courseId },
                    relations: ["words"],
                });
                const learning = new learning_model_1.default();
                learning.user = user;
                learning.course = course;
                learn = yield this.manager.getRepository(learning_model_1.default).save(learning);
            }
            else {
                if (learn.isDone) {
                    learn.isDone = false;
                    yield this.manager
                        .getRepository(learning_model_1.default)
                        .update(learn.id, { isDone: false });
                }
            }
            const myLearning = Object.assign(Object.assign({}, learn), { courseId: courseId, userId: userId, courseName: learn.course.title, words: learn.course.words });
            delete myLearning.course;
            delete myLearning.user;
            return myLearning;
        });
    }
    updateLearning(learnId, lastWordIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const learn = yield this.manager.findOne(learning_model_1.default, {
                where: { id: learnId },
                relations: { course: { words: true } },
            });
            if (lastWordIndex === learn.course.words.length - 1) {
                learn.isDone = true;
                learn.lastWordIndex = 0;
            }
            else {
                learn.isDone = false;
                learn.lastWordIndex = lastWordIndex;
            }
            yield this.manager.getRepository(learning_model_1.default).save(learn);
        });
    }
    updateTestItem(testItemId, userAnswer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.manager
                .getRepository(testItem_model_1.default)
                .update(testItemId, { user_answer: userAnswer });
        });
    }
    createTest(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            let test = yield this.manager.findOne(test_model_1.default, {
                where: {
                    user: { id: userId },
                    course: { id: courseId },
                    isDone: false,
                    testGroup: null,
                },
                relations: { testItems: { word: true }, course: true },
            });
            if (!test) {
                const course = yield this.manager.findOne(course_model_1.default, {
                    where: { id: courseId },
                    relations: ["words"],
                });
                const user = yield this.manager.findOne(user_model_1.default, { where: { id: userId } });
                const listWord = course.words;
                const listTestItem = course.words.map((word) => {
                    const testItem = new testItem_model_1.default();
                    const otherDefinitions = listWord
                        .filter((td) => td.term !== word.term)
                        .map((td) => td.definition);
                    const shuffledDefinitions = (0, shuffle_1.shuffleArray)(otherDefinitions);
                    const options = [
                        shuffledDefinitions[0] || "",
                        shuffledDefinitions[1] || "",
                        shuffledDefinitions[2] || "",
                        word.definition,
                    ];
                    const shuffledOptions = (0, shuffle_1.shuffleArray)(options);
                    testItem.word = word;
                    testItem.option_1 = shuffledOptions[0];
                    testItem.option_2 = shuffledOptions[1];
                    testItem.option_3 = shuffledOptions[2];
                    testItem.option_4 = shuffledOptions[3];
                    return testItem;
                });
                const testCreate = new test_model_1.default();
                testCreate.user = user;
                testCreate.course = course;
                testCreate.testItems = listTestItem;
                test = yield this.manager.getRepository(test_model_1.default).save(testCreate);
            }
            const listTestItems = test.testItems.map((item) => {
                const itemData = Object.assign(Object.assign({}, item), { question: item.word.term });
                delete itemData.word;
                return itemData;
            });
            listTestItems.sort((a, b) => a.id - b.id);
            const testData = Object.assign(Object.assign({}, test), { listTestItems: listTestItems, courseName: test.course.title });
            delete testData.course;
            delete testData.user;
            delete testData.testItems;
            return testData;
        });
    }
    createGroupTestDefault(groupId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = yield this.manager.findOne(group_model_1.default, {
                where: { id: groupId },
                relations: ["students"],
            });
            const listUser = groups.students;
            const course = yield this.manager.findOne(course_model_1.default, {
                where: { id: courseId },
                relations: ["words"],
            });
            const listWord = course.words;
            const listTestItem = course.words.map((word) => {
                const testItem = new testItem_model_1.default();
                const otherDefinitions = listWord
                    .filter((td) => td.term !== word.term)
                    .map((td) => td.definition);
                const shuffledDefinitions = (0, shuffle_1.shuffleArray)(otherDefinitions);
                const options = [
                    shuffledDefinitions[0] || "",
                    shuffledDefinitions[1] || "",
                    shuffledDefinitions[2] || "",
                    word.definition,
                ];
                const shuffledOptions = (0, shuffle_1.shuffleArray)(options);
                testItem.word = word;
                testItem.option_1 = shuffledOptions[0];
                testItem.option_2 = shuffledOptions[1];
                testItem.option_3 = shuffledOptions[2];
                testItem.option_4 = shuffledOptions[3];
                return testItem;
            });
            let testData = [];
            if (listUser.length === 0) {
                const testCreate = new test_model_1.default();
                testCreate.course = course;
                testCreate.testItems = listTestItem;
                const test = yield this.manager.getRepository(test_model_1.default).save(testCreate);
                testData.push(test);
            }
            else {
                const testPromise = listUser.map((user) => __awaiter(this, void 0, void 0, function* () {
                    const testCreate = new test_model_1.default();
                    testCreate.course = course;
                    testCreate.testItems = listTestItem;
                    testCreate.user = user;
                    const test = yield this.manager.getRepository(test_model_1.default).save(testCreate);
                    return test;
                }));
                testData = yield Promise.all(testPromise);
            }
            const testGroup = new testGroup_model_1.default();
            testGroup.group = groups;
            testGroup.tests = testData;
            testGroup.testName = "Test for" + course.title;
            yield this.manager.getRepository(testGroup_model_1.default).save(testGroup);
            return {
                testGroupId: testGroup.id,
                testName: "Test for " + course.title,
                courseId: course.id,
            };
        });
    }
    createTestForGroup(groupId, courseId, testName, testItems) {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = yield this.manager.findOne(group_model_1.default, {
                where: { id: groupId },
                relations: ["students"],
            });
            const listUser = groups.students;
            const course = yield this.manager.findOne(course_model_1.default, {
                where: { id: courseId },
                relations: ["words"],
            });
            let testData = [];
            if (listUser.length === 0) {
                const testCreate = new test_model_1.default();
                testCreate.course = course;
                testCreate.testItems = testItems;
                const test = yield this.manager.getRepository(test_model_1.default).save(testCreate);
                testData.push(test);
            }
            else {
                const testPromise = listUser.map((user) => __awaiter(this, void 0, void 0, function* () {
                    const testCreate = new test_model_1.default();
                    testCreate.course = course;
                    testCreate.testItems = testItems;
                    testCreate.user = user;
                    const test = yield this.manager.getRepository(test_model_1.default).save(testCreate);
                    return test;
                }));
                testData = yield Promise.all(testPromise);
            }
            const testGroup = new testGroup_model_1.default();
            testGroup.group = groups;
            testGroup.testName = testName;
            testGroup.tests = testData;
            const testGroupData = yield this.manager.getRepository(testGroup_model_1.default).save(testGroup);
            return {
                testGroupId: testGroupData.id,
                testName: testName,
                courseId: course.id,
            };
        });
    }
    createTestItemByTeacher(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.manager.findOne(course_model_1.default, {
                where: { id: courseId },
                relations: ["words"],
            });
            const listTestItem = course.words.map((word) => {
                const testItem = new testItem_model_1.default();
                const options = ["", "", "", word.definition];
                const shuffledOptions = (0, shuffle_1.shuffleArray)(options);
                testItem.word = word;
                testItem.option_1 = shuffledOptions[0];
                testItem.option_2 = shuffledOptions[1];
                testItem.option_3 = shuffledOptions[2];
                testItem.option_4 = shuffledOptions[3];
                return testItem;
            });
            return listTestItem;
        });
    }
    getTestByGroupId(groupId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const testGroups = yield this.manager.find(testGroup_model_1.default, {
                where: { group: { id: groupId } },
                relations: { tests: { user: true } },
            });
            const listTest = testGroups.map((test) => (test.tests.map((item) => {
                if (item.user.id === studentId) {
                    return {
                        testId: item.id,
                        testName: test.testName,
                        isDone: item.isDone,
                    };
                }
            }))).flat().filter(Boolean);
            return listTest;
        });
    }
    getTestForTeacher(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const testGroups = yield this.manager.find(testGroup_model_1.default, {
                where: { group: { id: groupId } },
                relations: { tests: { user: true }, group: { students: true } }
            });
            const group = yield this.manager.findOne(group_model_1.default, {
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
                };
            });
        });
    }
    getAllResultTestInGroup(testGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const testGroups = yield this.manager.find(testGroup_model_1.default, {
                where: { id: testGroupId },
                relations: { tests: { testItems: { word: true }, user: true }, group: { students: true } },
            });
            const tests = testGroups.map((testGroup) => testGroup.tests
                .map((test) => {
                if (test.isDone === true) {
                    const numberOfCorrectAnswer = test.testItems.filter((item) => item.user_answer === item.word.definition).length;
                    const numberOfWrong = test.testItems.length - numberOfCorrectAnswer;
                    const percentage = parseFloat(((numberOfCorrectAnswer / test.testItems.length) * 100).toFixed(2));
                    const isStudentInGroup = testGroup.group.students.some((student) => student.id === test.user.id);
                    return {
                        testId: test.id,
                        testName: testGroup.testName,
                        score: test.score,
                        studentName: test.user.name,
                        studentEmail: test.user.email,
                        numberOfCorrectAnswer,
                        numberOfWrong,
                        status: isStudentInGroup,
                        percentage,
                    };
                }
                return null;
            })).flat()
                .filter(Boolean);
            return tests;
        });
    }
    getAllResult(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tests = yield this.manager.find(test_model_1.default, {
                where: { user: { id: userId } },
                relations: { testItems: { word: true }, course: true, testGroup: true },
            });
            const listTest = tests.map((test) => {
                const numberOfCorrectAnswer = test.testItems.filter((item) => item.user_answer === item.word.definition).length;
                const numberOfWrong = test.testItems.length - numberOfCorrectAnswer;
                const percentage = parseFloat(((numberOfCorrectAnswer / test.testItems.length) * 100).toFixed(2));
                let testName = test.course.title;
                if (test.testGroup) {
                    testName = test.testGroup.testName;
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
        });
    }
    getTestDetail(testId) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield this.manager.findOne(test_model_1.default, {
                where: { id: testId },
                relations: { testItems: { word: true }, course: true },
            });
            let testName = test.course.title;
            if (test.testGroup) {
                testName = test.testGroup.testName;
            }
            const listTestItem = test.testItems.map((item) => {
                const itemData = Object.assign(Object.assign({}, item), { question: item.word.term });
                delete itemData.word;
                return itemData;
            });
            return { testName: testName, isDone: test.isDone, listTestItem: listTestItem.sort((a, b) => a.id - b.id) };
        });
    }
    getResultDetail(testId) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield this.manager.findOne(test_model_1.default, {
                where: { id: testId },
                relations: { testItems: { word: true }, course: true, testGroup: { group: true } },
            });
            let testName = test.course.title;
            let groupId = null;
            if (test.testGroup) {
                testName = test.testGroup.testName;
                groupId = test.testGroup.group.id;
            }
            const numberOfCorrectAnswer = test.testItems.filter((item) => item.user_answer === item.word.definition).length;
            const numberOfWrong = test.testItems.length - numberOfCorrectAnswer;
            const percentage = parseFloat(((numberOfCorrectAnswer / test.testItems.length) * 100).toFixed(2));
            const listTestItem = test.testItems.map((item) => {
                const itemData = Object.assign(Object.assign({}, item), { question: item.word.term, correct_answer: item.word.definition });
                delete itemData.word;
                return itemData;
            });
            return {
                testName: testName,
                groupId: groupId,
                overall: {
                    numberOfCorrectAnswer,
                    numberOfWrong,
                    percentage,
                    score: test.score,
                },
                listTestItems: listTestItem.sort((a, b) => a.id - b.id),
            };
        });
    }
    feedbackTest(testId, groupId, content, userFbId) {
        return __awaiter(this, void 0, void 0, function* () {
            const testGroup = yield this.manager.find(testGroup_model_1.default, {
                where: { id: groupId },
                relations: { tests: { user: true } },
            });
            const userFb = yield this.manager.findOne(user_model_1.default, {
                where: { id: userFbId },
            });
            const test = yield this.manager.findOne(test_model_1.default, {
                where: { id: testId },
            });
            const feedback = new feedback_model_1.default();
            feedback.user = userFb;
            feedback.content = content;
            feedback.test = test;
            yield this.manager.getRepository(feedback_model_1.default).save(feedback);
        });
    }
    getFeedbackTest(testId) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedbacks = yield this.manager.find(feedback_model_1.default, {
                where: { test: { id: testId } },
                relations: { user: true },
            });
            const listFeedbackPromise = feedbacks.map((feedback) => __awaiter(this, void 0, void 0, function* () {
                if (feedback.user.avatar) {
                    feedback.user.avatar = yield (0, s3_1.getObjectSignedUrl)(feedback.user.avatar);
                }
                return {
                    feedbackId: feedback.id,
                    userName: feedback.user.name,
                    userAvatar: feedback.user.avatar,
                    content: feedback.content,
                };
            }));
            return yield Promise.all(listFeedbackPromise);
        });
    }
    submitTest(testId) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield this.manager.findOne(test_model_1.default, {
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
            const testResult = yield this.manager.getRepository(test_model_1.default).save(test);
            const numberOfCorrectAnswer = scorePass / 100;
            const numberOfWrong = test.testItems.length - numberOfCorrectAnswer;
            const percentage = parseFloat(((numberOfCorrectAnswer / test.testItems.length) * 100).toFixed(2));
            const listTestItem = testResult.testItems.map((item) => {
                const itemData = Object.assign(Object.assign({}, item), { question: item.word.term, correct_answer: item.word.definition });
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
        });
    }
}
exports.default = LearningService;
//# sourceMappingURL=learning.service.js.map