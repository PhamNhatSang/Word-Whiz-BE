import { Controller, Delete, Get, Post, Put, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import LearningService from "../services/core/learning.service";
import Learning from "./../models/learning.model";
import { Answer } from "../type/DefineType";
import { InjectLearningService } from "../dependencyInject";
@Controller("/learning")
export default class LearningController {
    @InjectLearningService
    private learningService!: LearningService;
    



    @Get("/flashcard/:id")
    async getFlashcard(@Req() req: Request, @Res() res: Response) {
        try {
            const userId = req.body.currentUserData.id;
            const courseId = req.params.id;
            const result = await this.learningService.getOrCreateFLashCardLearningByUserId(parseInt(userId), parseInt(courseId));
            return res.send(result);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    @Put("/flashcard/:id")
    async learningFlashcard(@Req() req: Request, @Res() res: Response) {
        try {
            const learnId = req.body.learnId;
            const lastWordIndex = req.body.lastWordIndex;
            await this.learningService.updateLearning(parseInt(learnId), parseInt(lastWordIndex));
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
            const result = await this.learningService.createTest(parseInt(userId), parseInt(courseId));
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
            const result = await this.learningService.submitTest(parseInt(testId));
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }

    @Put("/testItem")
    async updateTestItem(@Req() req: Request, @Res() res: Response) {
        try {
            const testItemId = req.body.testItemId;
            const userAnswer = req.body.userAnswer;
            const result = await this.learningService.updateTestItem(parseInt(testItemId), userAnswer);
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }

}