import "reflect-metadata";
import { BaseService } from "../base/base.service";
import User from "../../models/user.model";
import { getObjectSignedUrl } from "../../s3";
export default class AuthService extends BaseService{

    constructor(){
        super();
    }

    async getByEmail(email: string): Promise<User | null> {
        return await this.manager.findOne(User,{ where: { email } });
    }

   
    async getAllInfor(id:number): Promise<User | null> {
        const user = await this.manager.findOne(User,{ where: { id }, relations:{myGroups:true,myCourses:true,addedGroups:true}});
        if(user.avatar)
            user.avatar = await getObjectSignedUrl(user.avatar);
        return user;
    }
    



    

}