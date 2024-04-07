"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const path_1 = __importDefault(require("path"));
const db_config_1 = require("./config/db.config");
exports.database = new sequelize_typescript_1.Sequelize(Object.assign(Object.assign({}, db_config_1.dbConfig), { models: [path_1.default.join(__dirname + '/models/*.model.ts')] }));
//# sourceMappingURL=database.js.map