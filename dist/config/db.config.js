"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
require("reflect-metadata");
exports.dbConfig = {
    repositoryMode: true,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {},
    }
};
//# sourceMappingURL=db.config.js.map