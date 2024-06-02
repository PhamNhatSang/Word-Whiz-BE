import { BaseController } from "./baseController";
import { Controller, Delete, Get, Post, Put, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import LearningService from "../services/core/learning.service";
import Learning from "./../models/learning.model";
import { Answer } from "../type/DefineType";
@Controller("/learning")
export default class LearningController extends BaseController<LearningService> {
    constructor() {
        super(new LearningService());
    }



    @Get("/flashcard/:id")
    async getFlashcard(@Req() req: Request, @Res() res: Response) {
        try {
            const userId = req.body.currentUserData.id;
            const courseId = req.params.id;
            const result = await this.service.getOrCreateFLashCardLearningByUserId(parseInt(userId), parseInt(courseId));
            return res.send(result);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    @Put("/flashcard/:id")
    async learningFlashcard(@Req() req: Request, @Res() res: Response) {
        try {
            const learning = req.body.learning;
            await this.service.update(Learning,learning);
            return res.send("Learning flashcard successfully");
        } catch (error) {
            return res.status(400).send(error);
        }

    }
    @Post("/test/:id")
    async startTest(@Req() req: Request, @Res() res: Response) {
        try {
            const userId = req.body.currentUserData.id;
            const courseId = req.params.id;
            const result = await this.service.createTest(parseInt(userId), parseInt(courseId));
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }

    @Put("/test/:id")
    async submitTest(@Req() req: Request, @Res() res: Response) {
        try {

            const testId = req.params.id;
            const answers = req.body.answers as Answer[];
            const result = await this.service.submitTest(answers,parseInt(testId));
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }

}