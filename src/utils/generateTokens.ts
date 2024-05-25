import { Payload } from "../type/DefineType";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

export const generateAccessToken = async (dataPayload:Payload) => {
  try {
   
    const accessToken = jwt.sign(dataPayload, process.env.ACCESS_SECRET_KEY, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "30d",
    });
    return Promise.resolve(accessToken);
  } catch (err) {
    return Promise.reject(err);
  }

}

export const generateRefreshToken = async (userData : Payload) => {
  try {
    const refreshToken = jwt.sign(userData, process.env.REFRESH_SECRET_KEY, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "30d",
    });
    return Promise.resolve(refreshToken);
  } catch (err) {
    return Promise.reject(err);
  }

}

