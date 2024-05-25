import "reflect-metadata";

import { Get, JsonController, Req, Res } from "routing-controllers";
import User from "../models/user.model";
import { BaseController } from "./baseController";
import UserService from "../services/auth/auth.service";
import { Request, Response } from "express";

@JsonController()
export default class UserController extends BaseController< UserService> {
  constructor() {
    super(new UserService());
  }

  @Get("/.me")
  async getCurrentUser(@Req() req: Request, @Res() res: Response) {
    const currentUserId = req.body.currentUserData.id;
    const user = await this.service.getAllInfor(currentUserId);
    return res.send(user);
  }
}
