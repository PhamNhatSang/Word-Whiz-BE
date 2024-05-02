import "reflect-metadata";
import { BaseService } from "../base/base.service";
import User from "../../models/user.model";

export default class AuthService extends BaseService<User>{

    constructor(){
        super(User);
    }

    async getByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({ where: { email } });
    }

    async create (user: User): Promise<User> {
        return await this.repository.save(user);
    }
    async getAllInfor(email:string): Promise<User | null> {
        return await this.repository.findOne({ where: { email }, relations:{myGroups:true,myCourses:true}});
    }
    



    

}