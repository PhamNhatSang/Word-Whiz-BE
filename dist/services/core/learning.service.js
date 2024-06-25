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
            const myLearning = Object.assign(Object.assign({}, learn), { courseId: courseId, userId: userId, courseName: learn.course.title, words: learn.course.words });
            delete myLearning.course;
            delete myLearning.user;
            return myLearning;
        });
    }
    updateLearning(learnId, lastWordIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.manager
                .getRepository(learning_model_1.default)
                .update(learnId, { lastWordIndex: lastWordIndex });
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
                where: { user: { id: userId }, course: { id: courseId }, isDone: false },
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
                listTestItems: listTestItem.sort((a, b) => a.id - b.id)
            };
        });
    }
}
exports.default = LearningService;
//# sourceMappingURL=learning.service.js.map