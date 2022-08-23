import 'express-async-errors';
import { Router } from 'express';
import MacthesController from '../controllers/matchesController';

const matchesRoute = Router();

matchesRoute.get('/', MacthesController.get);
matchesRoute.post('/', MacthesController.post);
matchesRoute.patch('/:id/finish', MacthesController.finish);

export default matchesRoute;
