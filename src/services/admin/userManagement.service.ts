import "reflect-metadata";
import { BaseService } from "../base/base.service";
import User from "../../models/user.model";
import { getObjectSignedUrl } from "../../s3";
import { deleteFile,uploadFile } from "../../s3";

export default class UserManagementService extends BaseService{

    constructor(){
        super();
    }

  async getAllInfor(page:number, results:number) {
        const skip = (page - 1) * results;
        const [users, total] = await this.manager.findAndCount(User, {
          skip: skip,
          take: results,
          order: {
            id: "DESC",
          },
        });
        const userPromises = users.map(async (user) => {
            if(user.avatar)
                user.avatar = await getObjectSignedUrl(user.avatar);
            
            return user;
            });
            const usersDataReturn = await Promise.all(userPromises);
            return {
            usersDataReturn,
            total,
            }
    }

    async updateUser(userData: User,file:Express.Multer.File) {
      if(file){
        if(userData.avatar){
            await deleteFile(userData.avatar);
        }
        userData.avatar = await uploadFile(file.buffer, file.mimetype);
      }

        await this.manager.update(User, userData.id, userData);
    }

    async deleteUser(id: number) {
        await this.manager.delete(User, id);
    }

  }

    



    

