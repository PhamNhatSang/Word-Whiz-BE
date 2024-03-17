import { dbConfig } from "./config/db.config";
import { Sequelize } from "sequelize-typescript";
import { Book } from "./models/book.model";
import {
  AuthTypes,
  Connector,
  IpAddressTypes,
} from "@google-cloud/cloud-sql-connector";
export async function createDatabase({
  instanceConnectionName,
  username,
  databaseName,
}: {
  instanceConnectionName: string;
  username: string;
  databaseName: string;
}) {

  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName,
    ipType: IpAddressTypes.PUBLIC,
    //authType: AuthTypes.IAM,
  });
  const database = new Sequelize({
    dialect: "mysql",
    username,
    database: databaseName,
    models: [Book],
    dialectOptions: {
      ...clientOpts,
    },
  });
  await database.authenticate();
  await database.sync({ force: true });
  return database;
}
