import { Controller, Get, Req, Res } from "routing-controllers";
import RankingService from "../services/core/ranking.services";
import { Request,Response } from "express";
@Controller("/ranking")
export default class Ranking  {
    private rankingService: RankingService;
    constructor() {
        this.rankingService = new RankingService();
    }

    @Get("/top")
    async getRanking(@Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.rankingService.getTopRanking();
            return res.send(result);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

}