import { Controller, Get, Post, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import Course from "../models/course.model";
import HomeService from "../services/core/home.service";
import CourseDetailService from "../services/core/courseDetail.service";
@Controller("/home")
export default class HomeController {

  private homeService: HomeService;
  constructor() {
    this.homeService = new HomeService();
  }
  @Get("/")
  async getHome(@Req() req: Request, @Res() res: Response) {
    try {
      const topCourse = await this.homeService.getTopCourse();
      const newCourse = await this.homeService.getNewCourse();
      const continueCourse =await this.homeService.getContinueCourse(req.body.currentUserData.id);
      return res.send({ topCourse, newCourse,continueCourse });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  @Get("/search")
  async searchCourse(@Req() req: Request, @Res() res: Response) {
    try {
      const title = req.query.title;
      const course = this.homeService.getCourseByTitle(title as string);
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
      await this.homeService.importCourse(userId, parseInt(courseId));
      return res.send("Import course successfully");
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  
}
