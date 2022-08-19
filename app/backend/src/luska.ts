import * as express from 'express';
import loginRoute from './routes/loginRoute';

const luska = express();
luska.use(express.json());

luska.use('/', loginRoute);

luska.listen(8080, () => {
  console.log(`server up on port: ${8080}`);
});
