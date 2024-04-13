"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
require("reflect-metadata");
require("dotenv/config");
const db_config_1 = require("./config/db.config");
const typeorm_1 = require("typeorm");
exports.database = new typeorm_1.DataSource(db_config_1.dbConfig);
//# sourceMappingURL=database.js.map