import * as jwt from 'jsonwebtoken';
import NotAuthorized from '../errors/notAuthorized';

const secret = String(process.env.JWT_SECRET);

const jwtValidade = {
  async validate(token: string) {
    try {
      const email = jwt.verify(token, secret);
      return email;
    } catch (e) {
      throw new NotAuthorized('Token must be a valid token');
    }
  },
};

export default jwtValidade;
