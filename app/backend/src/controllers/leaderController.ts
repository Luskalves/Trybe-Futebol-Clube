import { Request, Response } from 'express';
import LeaderService from '../services/leaderService';

export default class LeaderController {
  public service: LeaderService;
  constructor() {
    this.service = new LeaderService();
  }

  public async getHome(_req: Request, res: Response) {
    const boards = await this.service.getHome();
    res.status(200).json(boards);
  }

  public async getAway(_req: Request, res: Response) {
    const boards = await this.service.getAway();
    res.status(200).json(boards);
  }
}
