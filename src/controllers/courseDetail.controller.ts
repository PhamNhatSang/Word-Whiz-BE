import { BaseController } from "./baseController";
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
} from "routing-controllers";
import { Request, Response } from "express";
import Course from "../models/course.model";
import CourseDetailService from "../services/core/courseDetail.service";
import Word from "../models/word.model";
@Controller("/course")
export default class CourseDetailController extends BaseController<CourseDetailService> {
  constructor() {
    super(new CourseDetailService());
  }
  @Get("/:id")
  async getCourseDetail(@Req() req: Request, @Res() res: Response) {
    try {
      const courseId = req.params.id;
      const userId = req.body.currentUserData.id;
      const result = await this.service.getCourseDetail(parseInt(userId),parseInt(courseId));
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  @Post("/word")
  async addWord(@Req() req: Request, @Res() res: Response) {
    try {
      const courseId = req.body.courseId;
      const words = req.body.words as Word[];
      await this.service.createWord(parseInt(courseId), words);
      return res.send("Add word successfully");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  @Delete("/word/:id")
  async deleteWord(@Req() req: Request, @Res() res: Response) {
    try {
      const wordId = req.params.id;
      const deleteWordId = await this.service.delete(Word,parseInt(wordId));
      return res.send(deleteWordId);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  @Put("/")
  async updateCourse(@Req() req: Request, @Res() res: Response) {
    try {
      const course = req.body.course as Course;
      const wordUpdated = await this.service.update(Course,course);
      return res.send(wordUpdated);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
