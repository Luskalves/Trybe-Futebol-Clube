import { Router } from 'express';
import LoginController from '../controllers/loginController';

const loginRoute = Router();

loginRoute.post('/login', LoginController.post);

export default loginRoute;
