import "reflect-metadata";

import { Get, JsonController, Req, Res } from "routing-controllers";
import User from "../models/user.model";
import UserService from "../services/auth/auth.service";
import { Request, Response } from "express";

@JsonController()
export default class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();}

  @Get("/.me")
  async getCurrentUser(@Req() req: Request, @Res() res: Response) {
    const currentUserId = req.body.currentUserData.id;
    const user = await this.userService.getAllInfor(currentUserId);
    return res.send(user);
  }
}
