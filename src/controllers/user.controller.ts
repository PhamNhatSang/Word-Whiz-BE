import "reflect-metadata"

import { Get, JsonController } from "routing-controllers";
import User from "../models/user.model";
import { BaseController } from "./base-controller";
import UserService from "../services/user.service";

@JsonController("/users")
export default class UserController extends BaseController<User,UserService> {
  constructor() {
    super(new UserService());
  }

  @Get()
  async getAllOne() {
    return await this.service.getAll();
  }
}
