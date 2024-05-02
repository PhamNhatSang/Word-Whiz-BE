"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const user_model_1 = __importDefault(require("./models/user.model"));
const group_model_1 = __importDefault(require("./models/group.model"));
const course_model_1 = __importDefault(require("./models/course.model"));
const post_model_1 = __importDefault(require("./models/post.model"));
const comment_model_1 = __importDefault(require("./models/comment.model"));
const courseRate_model_1 = __importDefault(require("./models/courseRate.model"));
const react_model_1 = __importDefault(require("./models/react.model"));
const test_model_1 = __importDefault(require("./models/test.model"));
const word_model_1 = __importDefault(require("./models/word.model"));
const testItem_model_1 = __importDefault(require("./models/testItem.model"));
const entities = [user_model_1.default, group_model_1.default, course_model_1.default, post_model_1.default, comment_model_1.default, courseRate_model_1.default, react_model_1.default, test_model_1.default, word_model_1.default, testItem_model_1.default];
exports.database = new typeorm_1.DataSource({ logging: true,
    type: "postgres",
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: entities,
    migrations: ["src/migrations/*{.ts,.js}"],
    ssl: {}, });
//# sourceMappingURL=database.js.map