"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
exports.dbConfig = {
    logging: true,
    type: "postgres",
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path_1.default.join(__dirname + "/models/*.model.{js,ts}")],
    migrations: [path_1.default.join(__dirname + "/migrations/*.{js,ts}")],
    ssl: {},
};
//# sourceMappingURL=db.config.js.map