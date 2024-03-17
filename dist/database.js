"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const book_model_1 = require("./models/book.model");
const cloud_sql_connector_1 = require("@google-cloud/cloud-sql-connector");
async function createDatabase({ instanceConnectionName, username, databaseName, }) {
    const connector = new cloud_sql_connector_1.Connector();
    const clientOpts = await connector.getOptions({
        instanceConnectionName,
        ipType: cloud_sql_connector_1.IpAddressTypes.PUBLIC,
        //authType: AuthTypes.IAM,
    });
    const database = new sequelize_typescript_1.Sequelize({
        dialect: "mysql",
        username,
        database: databaseName,
        models: [book_model_1.Book],
        dialectOptions: {
            ...clientOpts,
        },
    });
    await database.authenticate();
    await database.sync({ force: true });
    return database;
}
exports.createDatabase = createDatabase;
//# sourceMappingURL=database.js.map