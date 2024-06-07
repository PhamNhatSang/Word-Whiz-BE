import { Controller, Get, Req, Res } from "routing-controllers";
import RankingService from "../services/core/ranking.services";
import { Request,Response } from "express";
import { BaseController } from "./baseController";
@Controller("/ranking")
export default class Ranking extends BaseController<RankingService> {
    constructor() {
        super(new RankingService());
    }

    @Get("/top")
    async getRanking(@Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.service.getTopRanking();
            return res.send(result);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

}