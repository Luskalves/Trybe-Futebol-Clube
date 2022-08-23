import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/matchesService';

export default class MacthesController {
  static async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await MatchesService.findAll();
      res.status(200).json(matches);
    } catch (e) {
      next(e);
    }
  }
}
