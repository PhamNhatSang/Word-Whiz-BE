import "reflect-metadata";



import 'dotenv/config';

import { dbConfig } from "./config/db.config";
import { DataSource } from "typeorm";
import User from "./models/user.model";
import Group from "./models/group.model";
import Course from "./models/course.model";
import Post from "./models/post.model";
import Comment from "./models/comment.model";
import CourseRate from "./models/courseRate.model";
import React from "./models/react.model";
import Test from "./models/test.model";
import Word from "./models/word.model";
import TestItem from "./models/testItem.model";
const entities = [User, Group, Course, Post, Comment, CourseRate, React, Test, Word, TestItem];
export const database = new DataSource({logging: true,
    type: "postgres",
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + "/models/**/*.model{.ts,.js}"],
    migrations: ["src/migrations/*{.ts,.js}"],
    ssl: {},});
