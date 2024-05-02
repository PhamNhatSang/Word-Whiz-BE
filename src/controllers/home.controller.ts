import { BaseController } from "./baseController";
import { Controller, Get, Post, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import Course from "../models/course.model";
import HomeService from "../services/core/home.service";
import CourseDetailService from "../services/core/courseDetail.service";
@Controller("/home")
export default class HomeController extends BaseController<
  Course,
  HomeService
> {
  protected courseDetailService: CourseDetailService;
  constructor() {
    super(new HomeService());
    this.courseDetailService = new CourseDetailService();
  }
  @Get("/")
  async getHome(@Req() req: Request, @Res() res: Response) {
    try {
      const topCourse = this.service.getTopCourse();
      const newCourse = this.service.getNewCourse();

      return res.send({ topCourse, newCourse });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  @Get("/search")
  async searchCourse(@Req() req: Request, @Res() res: Response) {
    try {
      const title = req.query.title;
      const course = this.service.getCourseByTitle(title as string);
      return res.send(course);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  @Post("/import/course")
  async importCourse(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.body.currentUserData.id;
      const courseId = req.body.courseId;
      await this.service.importCourse(userId, courseId);
      return res.send("Import course successfully");
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
