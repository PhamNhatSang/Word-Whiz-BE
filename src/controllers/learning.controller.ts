import { Controller, Delete, Get, Post, Put, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import LearningService from "../services/core/learning.service";
import Learning from "./../models/learning.model";
import { Answer } from "../type/DefineType";
import { InjectLearningService } from "../dependencyInject";
import TestItem from "../models/testItem.model";
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
            console.log('dsadsa')
            const userId = req.body.currentUserData.id;
            const courseId = req.params.id;
            const result = await this.learningService.createTest(parseInt(userId), parseInt(courseId));
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }


    @Get("/test/:id")
    async getTest(@Req() req: Request, @Res() res: Response) {
        try {
           const testId = req.params.id;
            const result = await this.learningService.getTestDetail(parseInt(testId));
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);


        }
    }
    @Post("/test-create/default")
    async createDefaultTest(@Req() req: Request, @Res() res: Response) {
        try {
            console.log('dsadsa')
            const {groupId,courseId,testName} = req.body
            const result = await this.learningService.createGroupTestDefault(parseInt(groupId),parseInt(courseId),testName);
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }

    @Get("/test-group/:id")
    async getTestByGroup(@Req() req: Request, @Res() res: Response) {
        try {
            const groupId = req.params.id;
            const userId = req.body.currentUserData.id;
            const result = await this.learningService.getTestByGroupId(parseInt(groupId),parseInt(userId));
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }

    @Get("/tests/:id")
    async getTests(@Req() req: Request, @Res() res: Response) {
        try {
            const groupId = req.params.id;
            const result = await this.learningService.getTestForTeacher(parseInt(groupId));
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }

    @Post("/test-create/edting")
    async createTestEddting(@Req() req: Request, @Res() res: Response) {
        try {
            const {groupId,courseId,testName} = req.body;
            const testItems = req.body.testItems as TestItem[];
            const result = await this.learningService.createTestForGroup(parseInt(groupId),parseInt(courseId),testName,testItems);
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }

    @Get("/test/group/results/:id")
    async getTestResults(@Req() req: Request, @Res() res: Response) {
        try {
            const groupId = req.params.id;
            const result = await this.learningService.getAllResultTestInGroup(parseInt(groupId));
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }

    @Get("/results/")
    async getTestResultsForUser(@Req() req: Request, @Res() res: Response) {
        try {
            const  userId = req.body.currentUserData.id;
            console.log("dsadsadsadsadsa");
            const result = await this.learningService.getAllResult(parseInt(userId));
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }

    @Get("/result/:id")
    async getTestResultDetail(@Req() req: Request, @Res() res: Response) {
        try {
            const testId = req.params.id;
            const result = await this.learningService.getResultDetail(parseInt(testId));
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }




    @Post("/testItem/:id")
    async createTestItem(@Req() req: Request, @Res() res: Response) {

        try {
            const courseId = req.params.id;
            const result = await this.learningService.createTestItemByTeacher(parseInt(courseId));
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