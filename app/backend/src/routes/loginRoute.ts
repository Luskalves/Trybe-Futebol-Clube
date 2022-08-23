import 'express-async-errors';
import { Router } from 'express';
import LoginController from '../controllers/loginController';

const loginRoute = Router();

loginRoute.post('/', LoginController.post);

loginRoute.get('/validate', LoginController.get);

export default loginRoute;
