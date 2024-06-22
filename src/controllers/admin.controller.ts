import { Authorized, Controller, Delete, Get, Put, QueryParam, Req, Res } from "routing-controllers";
import { InjectUserManagementService } from "../dependencyInject";
import { Request, Response } from "express";
import UserManagementService from "../services/admin/userManagement.service";
import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import User from "../models/user.model";

@Controller("/admin")
export default class Authcontroller {
    @InjectUserManagementService
    private userManagerService!: UserManagementService;

    @Authorized("ADMIN")
    @Get("/user-infor")
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
    @Put("/update-user")
    async updateUser(@Req() req: Request,@Res() res: Response){
        try{
            const result = await this.userManagerService.updateUser(req.body);
            return res.send(result);
        }
        catch(error){
            return res.status(400).send(error)
        }
        
    }

    @Authorized("ADMIN")
    @Delete("/delete-user")
    async deleteUser(@QueryParam("id") id: number,@Res() res: Response){
        try{
            const result = await this.userManagerService.deleteUser(id);
            return res.send(result);
        }
        catch(error){
            return res.status(400).send(error)
        }
    }

}