"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
require("reflect-metadata");
const sequelize_typescript_1 = require("sequelize-typescript");
const path_1 = __importDefault(require("path"));
exports.database = new sequelize_typescript_1.Sequelize({ repositoryMode: true,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {},
    }, models: [path_1.default.join(__dirname + '/models/*.model.ts')] });
//# sourceMappingURL=database.js.map