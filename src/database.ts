import { Sequelize } from "sequelize-typescript";
import path from 'path';

import { dbConfig } from "./config/db.config";
export const database = new Sequelize({...dbConfig,models:[path.join(__dirname + '/models/*.model.ts')]});
