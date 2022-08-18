import 'dotenv/config';
import Joi = require('joi');
import * as bcrypt from 'bcryptjs';
import jwt = require('jsonwebtoken');
import Users from '../database/models/Users';
import ILogin from '../interfaces/ILogin';

const secret = String(process.env.JWT_SECRET);

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export default class LoginService {
  static async find(body: ILogin) {
    const { error } = schema.validate(body);

    if (error) throw new Error();

    const passwordHash = await bcrypt.hash(body.password, 10)
      .then((hash) => hash);
    Users.findOne({ where: {
      email: body.email,
      password: passwordHash,
    } });

    const token = jwt.sign(body.email, secret);
    return token;
  }
}
