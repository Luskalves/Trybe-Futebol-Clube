import 'express-async-errors';
import { Router, Request, Response } from 'express';
import LeaderController from '../controllers/leaderController';

const leaderRoute = Router();

const leaderController = new LeaderController();

leaderRoute.get('/home', (req: Request, res: Response) => leaderController.getHome(req, res));
leaderRoute.get('/away', (req: Request, res: Response) => leaderController.getAway(req, res));

export default leaderRoute;
