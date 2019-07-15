import express, { Request, Response, request } from 'express';
import * as userService from '../services/user-service';
import * as reimbursementService from '../services/reimbursement-service';
import User from '../models/User';
let jwt = require('jsonwebtoken');

const loginRouter = express.Router();

loginRouter.post('', async (request: Request, response: Response) => {
    console.log(response);
    // let username= request.body.username;
    // let password= request.body.password;
    // console.log(username, password);
    const cred = request.body;
    // // Retrieve both username and password from the request
    const username = cred["username"];
    const password = cred["password"];

    let user : User = await userService.validateUser(username, password);
    
    console.log(user);
    if (user.username && user.password) {
        console.log(user);
    
        const token = jwt.sign({userId:user.userId, role: user.role}, 
            
                "tampaflorida" , //secretkey
               { expiresIn : "24hr" , //expires in 24 hr
            } );
        console.log(token);
        console.log(`Thank you for entering your login information ${user.username} ${user.password}`);
        console.log(`Thank you for entering your login information ${user.username} ${user.password}`);
       // response.status(200).json(user)
       response.status(200).json({
           message: user,
            sucess: true,
            token: {token}
       });
    }
    else response.status(400).json({message: 'You are not authorized for this operation'});
});
export default loginRouter;