import "reflect-metadata";
import { BaseService } from "./base.service";
import User from "../models/user.model";

export default class UserService extends BaseService<User>{

    constructor(){
        super(User);
    }

    async getByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({ where: { email } });
    }

}