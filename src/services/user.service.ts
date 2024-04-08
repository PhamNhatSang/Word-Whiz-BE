import exp from "constants";
import { BaseService } from "./base.service";
import User from "../models/user.model";

export default class UserService extends BaseService<User>{
    constructor(){
        super(User);
    }
}