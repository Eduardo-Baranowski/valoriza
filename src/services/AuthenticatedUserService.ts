import { getCustomRepository } from "typeorm";

import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticatedUserService {
  async execute({email, password}) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/password incorrect!");
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("Email/password incorrect!");
    }

    const token = sign({
      email: user.email
    }, "9ec56e3e57c7618e6669bf421c03d545", {
      subject: user.id,
      expiresIn: "1d"
    })

    return token;
  }

}

export {AuthenticatedUserService};
