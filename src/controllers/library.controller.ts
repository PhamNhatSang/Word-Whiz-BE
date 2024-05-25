import { BaseController } from "./baseController";
import { Controller, Delete, Get, Post, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import Course from "../models/course.model";
import LibraryService from "../services/core/library.service";
@Controller("/library")
export default class HomeController extends BaseController<LibraryService> {
  constructor() {
    super(new LibraryService());
  }

  @Get("/")
  async getLibrary(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.body.currentUserData.id;
      const title = req.query?.title;
      const result = this.service.getCourseByTitle(userId, title as string);
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  @Post("/course")
  async createCourse(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.body.currentUserData.id;

      const course = req.body as Course;
      await this.service.createCourse(parseInt(userId), course);
      return res.send("Create course successfully");
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  @Delete("/course/:id")
  async deleteCourse(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.body.currentUserData.id;
      const courseId = req.params.id;
      await this.service.deleteCourse(parseInt(userId), parseInt(courseId));
      return res.send("Delete course successfully");
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  @Get("/search")
  async searchCourse(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.body.currentUserData.id;
      const title = req.query.title;
      const result = this.service.getCourseByTitle(userId, title as string);
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  @Get("/course-add-group/:id")
  async getCourseAddGroup(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.body.currentUserData.id;
      const groupId = req.params.id;
      const result = await this.service.getListCourseToAddGroup(parseInt(userId), parseInt(groupId));
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

}
