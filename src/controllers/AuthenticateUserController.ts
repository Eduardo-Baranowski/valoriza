import {Request, Response} from 'express';
import { AuthenticatedUserService } from "../services/AuthenticatedUserService"

class AuthenticatedUserController{
  async handle(request: Request, response: Response) {
    const {email, password} = request.body

    const authenticatedUserService = new AuthenticatedUserService();

    const token = await authenticatedUserService.execute({
      email,
      password,
    });

    return response.json(token);
  }
}

export {AuthenticatedUserController}
