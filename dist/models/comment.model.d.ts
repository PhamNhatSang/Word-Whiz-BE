import "reflect-metadata";
import { BaseModel } from "./base-model";
export default class Comment extends BaseModel<Comment> {
    user_id: number;
    post_id: number;
    content: string;
}
