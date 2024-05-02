import { BaseController } from "./baseController";
import { Controller, Delete, Get, Post, Put, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import Course from "../models/course.model";
import CourseDetailService from "../services/core/courseDetail.service";
import Word from "../models/word.model";
@Controller("/courseDetail")
export default class CourseDetailController extends BaseController<
  Course,
  CourseDetailService> {
    constructor() {
        super(new CourseDetailService());
    }
    @Get("/:id")
    async getCourseDetail(@Req() req: Request, @Res() res: Response) {
        try {
            const courseId = req.params.id;
            const result = await this.service.getCourseDetail(parseInt(courseId));
            return res.send(result);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
    @Post("/word")
    async addWord(@Req() req: Request, @Res() res: Response) {
        try {
            const courseId = req.body.courseId;
            const word = req.body.word;
            await this.service.createWord(parseInt(courseId), word as Word);
            return res.send("Add word successfully");
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    @Delete("/word/:id")
    async deleteWord(@Req() req: Request, @Res() res: Response) {
        try {
            const wordId = req.params.id;
            const courseId = req.body.courseId;
            const deleteWordId=await this.service.deleteWord(parseInt(courseId),parseInt(wordId));
            return res.send(deleteWordId);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    @Put("/word")
    async updateWord(@Req() req: Request, @Res() res: Response) {
        try {
            const courseId = req.body.courseId;
            const word = req.body.word;
            const wordUpdated=await this.service.updateWord(parseInt(courseId),word as Word);
            return res.send(wordUpdated);
        } catch (error) {
            return res.status(400).send(error);
        }
    }


   
}