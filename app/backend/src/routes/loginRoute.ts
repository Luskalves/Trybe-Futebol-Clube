import { Router } from 'express';
import rescue from 'express-rescue';
import LoginController from '../controllers/loginController';

const loginRoute = Router();

loginRoute.post('/', rescue(LoginController.post));

export default loginRoute;
