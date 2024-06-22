import User from "../models/user.model";
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
import AuthService from "../services/auth/auth.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Payload } from "../type/DefineType";
import { InjectAuthService } from "../dependencyInject";

@JsonController("/auth")
export default class Authcontroller {

  @InjectAuthService
  private authService!: AuthService; 
 
  @Post("/register")
  async register(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.getByEmail(req.body.email);
    if (user) {
      throw new BadRequestError("User already exists");
    }
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = await this.authService.create(User,{
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    } as User);
    return res.send(newUser);
  }

  @Post("/login")
  async login(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.getByEmail(req.body.email);

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
    await this.authService.update(User,user);
    return res.send({ accessToken, refreshToken });
  }

  @Post("/admin/login")
  async adminLogin(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.getByEmail(req.body.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isValidPass = bcrypt.compareSync(req.body.password, user.password);
    if (!isValidPass) {
      throw new UnauthorizedError("Invalid email or password");
    }
    if (user.role !== "ADMIN") {
      throw new UnauthorizedError("Cannot access this route");
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
    await this.authService.update(User,user);
    return res.send({ accessToken, refreshToken });
  }

  @Get("/refresh")
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      throw new BadRequestError("Invalid refresh token");
    }
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_KEY
      ) as Payload;
      const user = await this.authService.getById(User,payload.id);

      if (!user || user.refeshToken !== refreshToken) {
        throw new BadRequestError("Invalid refresh token");
      }
      const token = await generateAccessToken({
        id: payload.id,
        role: payload.role,
      } as Payload);

      return res.send(token);
    } catch (err) {
      throw new BadRequestError("Invalid Expired Time");
    }
  }
}
