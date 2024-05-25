import { BaseController } from "./baseController";
import { Controller, Get, Post, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import Course from "../models/course.model";
import HomeService from "../services/core/home.service";
import CourseDetailService from "../services/core/courseDetail.service";
@Controller("/home")
export default class HomeController extends BaseController<HomeService> {
  protected courseDetailService: CourseDetailService;
  constructor() {
    super(new HomeService());
    this.courseDetailService = new CourseDetailService();
  }
  @Get("/")
  async getHome(@Req() req: Request, @Res() res: Response) {
    try {
      const topCourse = await this.service.getTopCourse();
      const newCourse = await this.service.getNewCourse();
      const continueCourse =await this.service.getContinueCourse(req.body.currentUserData.id);
      return res.send({ topCourse, newCourse,continueCourse });
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
  @Post("/import/course/:id")
  async importCourse(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.body.currentUserData.id;
      const courseId = req.params.id;
      await this.service.importCourse(userId, parseInt(courseId));
      return res.send("Import course successfully");
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  
}
