import { SequelizeOptions } from "sequelize-typescript";

export const dbConfig:SequelizeOptions={
  repositoryMode: true,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {},
  }
}


