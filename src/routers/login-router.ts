import express, { Request, Response, request } from 'express';
import * as userService from '../services/user-service';
import * as reimbursementService from '../services/reimbursement-service';
import User from '../models/User';
let jwt = require('jsonwebtoken');

const loginRouter = express.Router();

loginRouter.post('', async (request: Request, response: Response) => {
   // console.log(response);
    // let username= request.body.username;
    // let password= request.body.password;
    // console.log(username, password);
    const cred = request.body;
    
    // // Retrieve both username and password from the request
    const username = cred["username"];
    const password = cred["password"];
console.log (username, password);
    let user : any = await userService.validateUser(username, password);
   
    if (user === undefined)
        response.status(400).json({message: 'You are not authorized for this operation'});
    //console.log(user);
    else if (user.userid) {
            console.log(user);
        
            const token = jwt.sign({userId:user.userId, role: user.role}, 
                
                    "tampaflorida" , //secretkey
                   { expiresIn : "24hr" , //expires in 24 hr
                } );
            console.log(token);
            console.log(`Thank you for entering your login information ${user.username} `);
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


