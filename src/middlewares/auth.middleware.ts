import jwt from "jsonwebtoken";
import {
  Middleware,
  ExpressMiddlewareInterface,
  UnauthorizedError,
  
} from "routing-controllers";
import { Request, Response } from "express";
import { Payload } from "../type/DefineType";

@Middleware({ type: "before" })
export default class AuthMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: (err?: any) => any) {
    const url= request.originalUrl.split("/");
    if(url[2]==="auth"){
       return next();
    }
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedError("Token not provided");
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      throw new UnauthorizedError("Token error");
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      throw new UnauthorizedError("Token malformatted");
    }
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded :Payload) => {
      if (err) {
        throw new UnauthorizedError("Token invalid");
      }
      request.body.currentUserData = decoded;
      console.log(decoded);
       next();
    });
  }
}
