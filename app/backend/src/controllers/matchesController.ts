import { Request, Response, NextFunction } from 'express';

export default class MacthesController {
  static async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = ['1'];
      res.status(200).json(matches);
    } catch (e) {
      next(e);
    }
  }
}
