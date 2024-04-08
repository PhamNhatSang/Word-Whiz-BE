import "reflect-metadata";
import { BaseModel } from "./base-model";
import User from "./user.model";
import Comment from "./comment.model";
import React from "./react.model";
export default class Post extends BaseModel<Post> {
    owner_id: number;
    owner: User;
    content: string;
    image: string;
    userComment: Array<User & {
        Comment: Comment;
    }>;
    userReacts: Array<User & {
        React: React;
    }>;
}
