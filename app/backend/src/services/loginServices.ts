import 'dotenv/config';
import Joi = require('joi');
import jwt = require('jsonwebtoken');
// import * as bcrypt from 'bcryptjs';
import BadRequest from '../errors/badRequest';
import NotAuthorized from '../errors/notAuthorized';
import Users from '../database/models/Users';
import ILogin from '../interfaces/ILogin';

const secret = String(process.env.JWT_SECRET);

export const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default class LoginService {
  static async find(body: ILogin) {
    const { error } = schema.validate(body);
    if (error) throw new BadRequest('All fields must be filled');

    const user = await Users.findOne({ where: {
      email: body.email,
    } });

    if (user?.id !== undefined) {
      const token = jwt.sign(body.email, secret);
      return token;
    }
    throw new NotAuthorized('Incorrect email or password');
  }
}
