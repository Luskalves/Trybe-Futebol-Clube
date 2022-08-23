import * as jwt from 'jsonwebtoken';

const secret = String(process.env.JWT_SECRET);

const jwtValidade = {
  async validate(token: string) {
    try {
      jwt.verify(token, secret, (err) => {
        if (err) {
          throw new Error();
        }
      });
      return true;
    } catch (e) {
      return undefined;
    }
  },
};

export default jwtValidade;
