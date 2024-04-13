import "reflect-metadata";



import 'dotenv/config';

import { dbConfig } from "./config/db.config";
import { DataSource } from "typeorm";
export const database = new DataSource(dbConfig);
