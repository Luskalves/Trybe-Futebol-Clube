import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/loginServices';

export default class LoginController {
  static async post(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await LoginService.find(req.body);
      res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  }
}
