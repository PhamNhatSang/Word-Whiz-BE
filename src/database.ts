import "reflect-metadata";

import { Sequelize } from "sequelize-typescript";
import path from 'path';

import { dbConfig } from "./config/db.config";
export const database = new Sequelize({repositoryMode: true,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {},
    },models:[path.join(__dirname + '/models/*.model.ts')]});
