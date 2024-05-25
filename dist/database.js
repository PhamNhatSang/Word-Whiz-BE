"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manager = exports.database = void 0;
require("reflect-metadata");
require("dotenv/config");
const db_config_1 = require("./config/db.config");
const typeorm_1 = require("typeorm");
exports.database = new typeorm_1.DataSource(Object.assign(Object.assign({}, db_config_1.dbConfig), { entities: [__dirname + "/models/**/*.model{.ts,.js}"], migrations: [__dirname + "/migrations/**/*{.ts,.js}"] }));
exports.manager = exports.database.manager;
//# sourceMappingURL=database.js.map