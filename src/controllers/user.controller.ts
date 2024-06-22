import "reflect-metadata";

import { Get, JsonController, Req, Res } from "routing-controllers";
import User from "../models/user.model";
import AuthService from "../services/auth/auth.service";
import { Request, Response } from "express";
import { InjectAuthService } from "../dependencyInject";

@JsonController()
export default class UserController {
  @InjectAuthService
  private authService!: AuthService;
 

  @Get("/.me")
  async getCurrentUser(@Req() req: Request, @Res() res: Response) {
    const currentUserId = req.body.currentUserData.id;
    const user = await this.authService.getAllInfor(currentUserId);
    return res.send(user);
  }
}
