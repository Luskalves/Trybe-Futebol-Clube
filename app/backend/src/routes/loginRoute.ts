import { Router } from 'express';

import LoginController from '../controllers/loginController';

const loginRoute = Router();

loginRoute.post('/', LoginController.post);

export default loginRoute;
