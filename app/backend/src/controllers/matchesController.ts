import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

// copia e cola: req: Request, res: Response

export default class MacthesController {
  static async get(_req: Request, res: Response) {
    const matches = await MatchesService.findAll();
    res.status(200).json(matches);
  }

  static async post(req: Request, res: Response) {
    const match = req.body;
    const token = String(req.headers.authorization);
    const newMatch = await MatchesService.newMatch(match, token);

    res.status(201).json(newMatch);
  }

  static async finish(req: Request, res: Response) {
    const id = Number(req.params.id);

    await MatchesService.finishMatch(id);

    const message = 'Finished';
    res.status(200).json({ message });
  }
}
