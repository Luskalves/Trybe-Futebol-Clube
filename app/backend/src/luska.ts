import * as express from 'express';
import Users from './database/models/Users';

const app = express();

app.get('/', async (_req, res) => {
  const users = await Users.findAll();
  res.send(users);
});

app.listen(8080, () => {
  console.log('server up');
});
