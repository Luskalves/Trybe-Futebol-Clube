import 'express-async-errors';
import { Router, Request, Response } from 'express';
import LeaderController from '../controllers/leaderController';

const leaderRoute = Router();

const leaderController = new LeaderController();

leaderRoute.get('/home', (req: Request, res: Response) => leaderController.get(req, res));

export default leaderRoute;
