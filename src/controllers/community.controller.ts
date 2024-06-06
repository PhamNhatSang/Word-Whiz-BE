import { BaseController } from "./baseController";
import { UploadMidleware } from "../middlewares/upload.middleware";
import AuthMiddleware from "../middlewares/auth.middleware";
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { Request, Response } from "express";
import CommunityService from "../services/core/community.service";
@UseBefore(AuthMiddleware)
@UseBefore(UploadMidleware)
@Controller("/community")
export default class CommunityController extends BaseController<CommunityService> {
  constructor() {
    super(new CommunityService());
  }

  @Post("/post")
  async createPost(@Req() req: Request, @Res() res: Response) {
    try {
      const file = req.file as Express.Multer.File;
      const userId = req.body.currentUserData.id;
      const listCourseId = req.body.listCourseId 
        ? req.body.listCourseId.split(",").map((id: string) => parseInt(id))
        : [];

      const content = req.body.content;
      const result = await this.service.createPost(
        parseInt(userId),
        listCourseId,
        file,
        content
      );

      console.log(result);
      return res.send(result);
    } catch (error) {
        console.log(error);
      return res.status(400).send(error);
    }
  }
  @Post("/post/comment")
  async createComment(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.body.currentUserData.id;
      const postId = req.body.postId;
      const content = req.body.content;
      const result = await this.service.createComment(
        parseInt(userId),
        parseInt(postId),
        content
      );
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  @Post("/post/like/:id")
  async likePost(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.body.currentUserData.id;
      const postId = req.params.id;
      const isLiked = req.body.isLiked;
      const result = await this.service.reactPost(parseInt(userId),isLiked, parseInt(postId));
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  @Get("/")
  async getCommunities(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.body.currentUserData.id;
      const result = await this.service.getCommunities(parseInt(userId));
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
  @Get("/post/comment/:id")
  async getComments(@Req() req: Request, @Res() res: Response) {
    try {
      const postId = req.params.id;
      const result = await this.service.getComments(parseInt(postId));
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

}
