import { Router } from 'express';
import TeamsController from '../controllers/teamsContoller';

const teamsRoute = Router();

teamsRoute.get('/', TeamsController.get);

export default teamsRoute;
