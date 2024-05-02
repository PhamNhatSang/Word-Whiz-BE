import "reflect-metadata";
import { DataSourceOptions } from "typeorm";
export const dbConfig: DataSourceOptions = {
  logging: true,
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {},
};
