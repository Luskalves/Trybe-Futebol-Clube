import { Request, Response } from 'express';
import LoginService from '../services/loginServices';

export default class LoginController {
  static async get(req: Request, res: Response) {
    const token = String(req.headers.authorization);
    const role = await LoginService.role(token);
    res.status(200).json({ role });
  }

  static async post(req: Request, res: Response) {
    const token = await LoginService.find(req.body);
    res.status(200).json({ token });
  }
}
