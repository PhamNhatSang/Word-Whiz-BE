import "reflect-metadata";
import User from "../models/user.model";
import { BaseController } from "./base-controller";
export default class UserController extends BaseController<User> {
    constructor();
    getAllOne(): Promise<User[]>;
}
