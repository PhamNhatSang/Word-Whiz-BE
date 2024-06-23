import { Authorized, Controller, Delete, Get, Put, QueryParam, Req, Res, UseBefore } from "routing-controllers";
import { InjectPostManagementService, InjectUserManagementService } from "../dependencyInject";
import { Request, Response } from "express";
import UserManagementService from "../services/admin/userManagement.service";
import User from "../models/user.model";
import PostManagementService from "../services/admin/postManagement.service";
import { UploadMidleware } from "../middlewares/upload.middleware";
import AuthMiddleware from "../middlewares/auth.middleware";
@UseBefore(UploadMidleware)
@UseBefore(AuthMiddleware)
@Controller("/admin")
export default class Authcontroller {
    @InjectUserManagementService
    private userManagerService!: UserManagementService;

    @InjectPostManagementService
    private postManagementService!: PostManagementService;

    @Authorized("ADMIN")
    @Get("/users")
    async getAllInfor(@QueryParam("page") page :number,@QueryParam("results") results:number,@Res() res: Response){
        try {

            const result = await this.userManagerService.getAllInfor(page,results);
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);

    }
}
    @Authorized("ADMIN")
    @Put("/user")
    async updateUser(@Req() req: Request,@Res() res: Response){
        try{
            const file = req.file as Express.Multer.File;
            let userData ={id:req.body.id,name:req.body.name,email:req.body.email,role:req.body.role} as User;
        
            const result = await this.userManagerService.updateUser(userData,file);
            return res.send(result);
        }
        catch(error){
            return res.status(400).send(error)
        }
        
    }

    @Authorized("ADMIN")
    @Delete("/user/:id")
    async deleteUser(@Req() req:Request,@Res() res: Response){
        try{
            const id = req.params.id;
            const result = await this.userManagerService.deleteUser(parseInt(id));
            return res.send(result);
        }
        catch(error){
            return res.status(400).send(error)
        }
    }

    @Authorized("ADMIN")
    @Get("/posts")
    async getAllPosts(@QueryParam("page") page :number,@QueryParam("results") results:number,@Res() res: Response){
        try {

            const result = await this.postManagementService.getAllPost(page,results);
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);

    }
}
    
@Authorized("ADMIN")
@Delete("/post/:id")
async deletePost(@Req() req:Request,@Res() res: Response){
    try{
        const id = req.params.id;
        const result = await this.postManagementService.deletePost(parseInt(id));
        return res.send(result);
    }
    catch(error){
        return res.status(400).send(error)
    }
}

    




}