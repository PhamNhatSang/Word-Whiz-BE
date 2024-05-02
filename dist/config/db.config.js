"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
require("reflect-metadata");
exports.dbConfig = {
    logging: true,
    type: "postgres",
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + "/models/*.model.{js,ts}"],
    migrations: [__dirname + "/migrations/*.{js,ts}"],
    ssl: {},
};
//# sourceMappingURL=db.config.js.map