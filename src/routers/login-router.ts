import express, { Request, Response, request } from 'express';
import * as userService from '../services/user-service';
import User from '../models/User';
const loginRouter = express.Router();

loginRouter.post('', (request: Request, response: Response) => {
    const user = userService.createUser(request.body);
    if (user.username && user.password) {
      
        console.log(`Thank you for entering your login information ${user.username} ${user.password}`);
        response.status(201).json(user);
    }
    else response.status(400).json({message: 'Invalid Credentials'});
});
    
export default loginRouter;