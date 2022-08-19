import { Request, Response } from 'express';
import LoginService from '../services/loginServices';

export default class LoginController {
  static async post(req: Request, res: Response) {
    const token = await LoginService.find(req.body);

    res.status(200).json({ token });
  }
}
