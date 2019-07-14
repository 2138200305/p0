import express, { Request, Response, request } from 'express';
import * as userService from '../services/user-service';
import * as reimbursementService from '../services/reimbursement-service';
import User from '../models/User';

const loginRouter = express.Router();

loginRouter.post('', async (request: Request, response: Response) => {
    let username= request.body.username;
    let password= request.body.password;
    console.log(username, password);
    let user = await userService.validateUser(username, password);

    console.log(user);
    if (user[0].username && user[0].user_password) {

        console.log(`Thank you for entering your login information ${user.username} ${user.password}`);
        console.log(`Thank you for entering your login information ${user[0].username} ${user[0].password}`);
        response.status(201).json(user);
    }
    else response.status(400).json({message: 'Invalid Credentials'});
});
export default loginRouter;