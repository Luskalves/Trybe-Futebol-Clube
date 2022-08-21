import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/loginServices';

export default class LoginController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const token = String(req.headers.authorization);
      const role = await LoginService.role(token);
      res.status(200).json({ role });
    } catch (e) {
      next(e);
    }
  }

  static async post(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await LoginService.find(req.body);
      res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  }
}
