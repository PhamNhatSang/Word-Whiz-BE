import User from "../models/user.model";
import { BaseController } from "./base-controller";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";
import {
  BadRequestError,
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
import { Payload } from "../type/DefineType";

@JsonController("/auth")
export default class Authcontroller extends BaseController<User, UserService> {
  constructor() {
    super(new UserService());
  }
  @Post("/register")
  async register(@Req() req: Request, @Res() res: Response) {
    const user = await this.service.getByEmail(req.body.email);
    if (user) {
      throw new BadRequestError("User already exists");
    }
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = await this.service.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    } as User);
    return res.send(newUser);
  }

  @Post("/login")
  async login(@Req() req: Request, @Res() res: Response) {
    const user = await this.service.getByEmail(req.body.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isValidPass = bcrypt.compareSync(req.body.password, user.password);
    if (!isValidPass) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const accessToken = await generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    } as Payload);
    const refreshToken = await generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    } as Payload);
    user.refeshToken = refreshToken;
    console.log(user);
    await this.service.update(user);
    const testData = await this.service.getAllInfor("sang@gmail.com");
    JSON.parse(JSON.stringify(testData));
    console.log(JSON.parse(JSON.stringify(testData)));

    return res.send({ accessToken, refreshToken });
  }

  @Get("/refresh")
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
      throw new UnauthorizedError("Invalid token");
    }
    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY
    ) as Payload;

    const token = await generateAccessToken({
      id: payload.id,
      role: payload.role,
    } as Payload);

    return res.send(token);
  }
}
