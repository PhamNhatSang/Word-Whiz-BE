import { Authorized, Controller, Delete, Get, Put, QueryParam, Req, Res } from "routing-controllers";
import { InjectPostManagementService, InjectUserManagementService } from "../dependencyInject";
import { Request, Response } from "express";
import UserManagementService from "../services/admin/userManagement.service";
import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import User from "../models/user.model";
import Post from "../models/post.model";
import PostManagementService from "../services/admin/postManagement.service";

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
            return res.status(400).send(error);2

    }
}

    @Authorized("ADMIN")
    @Put("/user")
    async updateUser(@Req() req: Request,@Res() res: Response){
        try{
            const result = await this.userManagerService.updateUser(req.body as User);
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