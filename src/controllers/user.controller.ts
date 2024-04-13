import "reflect-metadata";

import { Get, JsonController, Req, Res } from "routing-controllers";
import User from "../models/user.model";
import { BaseController } from "./base-controller";
import UserService from "../services/user.service";
import { Request, Response } from "express";

@JsonController()
export default class UserController extends BaseController<User, UserService> {
  constructor() {
    super(new UserService());
  }

  @Get("/.me")
  async getCurrentUser(@Req() req: Request, @Res() res: Response) {
    const currentUserId = req.body.currentUserData.id;
    const user = await this.service.getById(currentUserId);
    return res.send(user);
  }
}
