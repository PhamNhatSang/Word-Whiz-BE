import "reflect-metadata";
import { BaseModel } from "./base-model";
import { Role } from "../enum/Role";
import Group from "./group.model";
import Course from "./course.model";
import Post from "./post.model";
import Comment from "./comment.model";
import CourseRate from "./course-rate.model";
import React from "./react.model";
export default class User extends BaseModel<User> {
    name: string;
    email: string;
    password: string;
    role: Role;
    my_groups: Group[];
    my_courses: Course[];
    my_posts: Post[];
    groups: Group[];
    postComments: Array<Post & {
        Comment: Comment;
    }>;
    postReacts: Array<Post & {
        React: React;
    }>;
    postRates: Array<Course & {
        CourseRate: CourseRate;
    }>;
}
