import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  static async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamsService.findAll();

      res.status(200).json(teams);
    } catch (e) {
      next(e);
    }
  }

  static async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const team = await TeamsService.findOne(id);
      res.status(200).json(team);
    } catch (e) {
      next(e);
    }
  }
}
