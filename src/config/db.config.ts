import "reflect-metadata";
import path, { dirname,join } from "path";
import { DataSourceOptions } from "typeorm";

const isProduction = process.env.NODE_ENV === "production";
const rootDir = isProduction ? process.cwd() : join(process.cwd(), "src");
import User from "../models/user.model";
export const dbConfig: DataSourceOptions = {
  logging: true,
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  migrations: [join(rootDir, "migrations", "*.{js,ts}")],
  ssl: {},
};
