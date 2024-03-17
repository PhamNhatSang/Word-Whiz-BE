"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const book_model_1 = require("./models/book.model");
const cloud_sql_connector_1 = require("@google-cloud/cloud-sql-connector");
function createDatabase(_a) {
    return __awaiter(this, arguments, void 0, function* ({ instanceConnectionName, username, databaseName, }) {
        const connector = new cloud_sql_connector_1.Connector();
        const clientOpts = yield connector.getOptions({
            instanceConnectionName,
            ipType: cloud_sql_connector_1.IpAddressTypes.PUBLIC,
            //authType: AuthTypes.IAM,
        });
        const database = new sequelize_typescript_1.Sequelize({
            dialect: "mysql",
            username,
            database: databaseName,
            models: [book_model_1.Book],
            dialectOptions: Object.assign({}, clientOpts),
        });
        yield database.authenticate();
        yield database.sync({ force: true });
        return database;
    });
}
exports.createDatabase = createDatabase;
//# sourceMappingURL=database.js.map