import "reflect-metadata";

import { Sequelize } from "sequelize-typescript";
import path from 'path';

import { dbConfig } from "./config/db.config";
import User from "./models/user.model";
export const database = new Sequelize({...dbConfig,models:[path.join(__dirname + '/models/*.model.{js,ts}')]});
