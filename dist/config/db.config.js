"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
require("reflect-metadata");
const path_1 = require("path");
const isProduction = process.env.NODE_ENV === "production";
const rootDir = isProduction ? process.cwd() : (0, path_1.join)(process.cwd(), "src");
exports.dbConfig = {
    logging: true,
    type: "postgres",
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [(0, path_1.join)(rootDir, "models", "*.model.{js,ts}")],
    migrations: [(0, path_1.join)(rootDir, "migrations", "*.{js,ts}")],
    ssl: {},
};
//# sourceMappingURL=db.config.js.map