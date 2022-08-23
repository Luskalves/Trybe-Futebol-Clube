import 'express-async-errors';
import { Router } from 'express';
import TeamsController from '../controllers/teamsContoller';

const teamsRoute = Router();

teamsRoute.get('/', TeamsController.get);
teamsRoute.get('/:id', TeamsController.findOne);

export default teamsRoute;
