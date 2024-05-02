import { BaseController } from "./baseController";
import { Controller, Delete, Get, Post, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import Group from "../models/group.model";
import GroupService from "../services/core/group.service";
@Controller("/group")
export default class GroupController extends BaseController<Group, GroupService> {
    @Get("/")
    async getListGroup(@Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.service.getAll();
            return res.send(result);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
    @Get("/:id")
    async getGroupById(@Req() req: Request, @Res() res: Response) {
        try {
            const groupId = req.params.id;
            const result = await this.service.getById(parseInt(groupId));
            return res.send(result);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    @Post("/")
    async createGroup(@Req() req: Request, @Res() res: Response) {
        try {
            const group = req.body.group;
            const userId = req.body.currentUserData.id;
            await this.service.createGroup(parseInt(userId),group as Group);
            return res.send("Create group successfully");
        } catch (error) {
            return res.status(400).send(error);
        }
    }
    @Delete("/:id")
    async deleteGroup(@Req() req: Request, @Res() res: Response) {
        try {
            const userId = req.body.currentUserData.id;
            const groupId = req.params.id;
            await this.service.deleteGroup(parseInt(userId), parseInt(groupId));
            return res.send("Delete group successfully");
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    @Post("/student")
    async addStudent(@Req() req: Request, @Res() res: Response) {
        try {
            const groupId = req.body.groupId;
            const emails = req.body.emails as string[];
            const group= await this.service.addStudent(parseInt(groupId), emails);
            return res.send(group);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
    @Delete("/student")
    async removeStudent(@Req() req: Request, @Res() res: Response) {
        try {
            const groupId = req.body.groupId;
            const emails = req.body.emails as string[];
            const group= await this.service.removeStudent(parseInt(groupId), emails);
            return res.send(group);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    @Post("/course")
    async addCourse(@Req() req: Request, @Res() res: Response) {
        try {
            const userId = req.body.currentUserData.id;
            const groupId = req.body.groupId;
            const courseId = req.body.courseId;
            const group= await this.service.addCourseToGroup(parseInt(groupId),parseInt(userId),parseInt(courseId));
            return res.send(group);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    @Delete("/course")
    async removeCourse(@Req() req: Request, @Res() res: Response) {
        try {
            const userId = req.body.currentUserData.id;
            const groupId = req.body.groupId;
            const courseId = req.body.courseId;
            const group= await this.service.removeCourseFromGroup(parseInt(groupId),parseInt(courseId));
            return res.send(group);
        } catch (error) {
            return res.status(400).send(error);
        }
    }



    
}