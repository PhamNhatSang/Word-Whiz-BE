"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
require("reflect-metadata");
const path_1 = require("path");
const isProduction = process.env.NODE_ENV === "production";
const rootDir = isProduction ? process.cwd() : (0, path_1.join)(process.cwd(), "src");
const user_model_1 = __importDefault(require("../models/user.model"));
exports.dbConfig = {
    logging: true,
    type: "postgres",
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [user_model_1.default],
    migrations: [(0, path_1.join)(rootDir, "migrations", "*.{js,ts}")],
    ssl: {},
};
//# sourceMappingURL=db.config.js.map