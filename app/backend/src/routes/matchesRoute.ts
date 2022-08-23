import { Router } from 'express';
import MacthesController from '../controllers/matchesController';

const matchesRoute = Router();

matchesRoute.get('/', MacthesController.get);

export default matchesRoute;
