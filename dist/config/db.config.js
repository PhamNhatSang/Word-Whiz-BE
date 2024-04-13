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
    entities: ["src/models/**/*.model.{ts,js}"],
    migrations: ["src/migrations/**/*.{ts,js}"],
    ssl: {}
};
//# sourceMappingURL=db.config.js.map