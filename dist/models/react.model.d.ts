import "reflect-metadata";
import { BaseModel } from "./base-model";
import { Emotion } from "../enum/Emotion";
export default class React extends BaseModel<React> {
    user_id: number;
    post_id: number;
    emotion: Emotion;
}
