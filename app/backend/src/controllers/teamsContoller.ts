import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  static async get(_req: Request, res: Response) {
    const teams = await TeamsService.findAll();

    res.status(200).json(teams);
  }

  static async findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const team = await TeamsService.findOne(id);
    res.status(200).json(team);
  }
}
