import User from "../models/user.model";
import { BaseController } from "./base-controller";

import {
  Body,
  Controller,
  Get,
  JsonController,
  Post,
  Req,
  Res,
  UnauthorizedError,
} from "routing-controllers";
import UserService from "../services/user.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
@Controller("/auth")
export default class Authcontroller extends BaseController<User, UserService> {
  constructor() {
    super(new UserService());
  }

  @Post("/login")
  async login(@Req() req: Request, @Res() res: Response){
    const user = (await this.service.getByEmail(req.body.email)).dataValues;
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isValidPass = bcrypt.compareSync(req.body.password, user.password);
    if (!isValidPass) {
      throw new UnauthorizedError("Invalid email or password");
    }
   
    
    const accessToken = jwt.sign({name:user.name,email:user.email,role:user.role}, process.env.SECRET_KEY, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 60, // 24 hours
    });

    return res.send({ accessToken });
  }
}
