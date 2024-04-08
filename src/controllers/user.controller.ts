import { Get, JsonController } from "routing-controllers";
import User from "../models/user.model";
import { BaseController } from "./base-controller";
import UserService from "../services/user.service";
@JsonController("/users")
export default class UserController extends BaseController<User> {
  constructor() {
    super(new UserService());
   
  }

  @Get()
  getAllOne() {
    this.service.getAll();
    const data = "get all one"
    return this.service.getAll();
  }
}
