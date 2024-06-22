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
import { InjectCourseDetailService } from "../dependencyInject";
@Controller("/course")
export default class CourseDetailController {
  @InjectCourseDetailService
  courseDetailService!: CourseDetailService;
  
  @Get("/:id")
  async getCourseDetail(@Req() req: Request, @Res() res: Response) {
    try {
      const courseId = req.params.id;
      const userId = req.body.currentUserData.id;
      const result = await this.courseDetailService.getCourseDetail(parseInt(userId),parseInt(courseId));
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
      await this.courseDetailService.createWord(parseInt(courseId), words);
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
      const deleteWordId = await this.courseDetailService.delete(Word,parseInt(wordId));
      return res.send(deleteWordId);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  @Put("/")
  async updateCourse(@Req() req: Request, @Res() res: Response) {
    try {
      const course = req.body.course as Course;
      const wordUpdated = await this.courseDetailService.updateCourse(course);
      return res.send(wordUpdated);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  @Post("/rate/:id")
  async rateCourse(@Req() req: Request, @Res() res: Response) {
    try {
      const courseId = req.params.id;
      const userId = req.body.currentUserData.id;
      const rate = req.body.rate;
      await this.courseDetailService.rateCourse(parseInt(userId), parseInt(courseId), rate);
      return res.send("Rate course successfully");
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
