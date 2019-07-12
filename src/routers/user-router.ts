import express, { Request, Response, request } from 'express';
import * as userService from '../services/user-service';
import User from '../models/User';
const userRouter = express.Router();
/*
 * A router has methods to handle specific http methods
 * Additionally, we could handle all of them using 'all'
 * Http Methods
 * ----
 * GET, POST, PATCH, PUT, DELETE
 */
// Handle the creation of a new user
// We want to deal strictly with the request/response objects here
// and delegate the internal logic to a 'service'
userRouter.post('', (request: Request, response: Response) => {
    const user = userService.createUser(request.body);
    if (user) {
        response.status(201).json(user);
    }
    else response.sendStatus(500);
});



userRouter.get('/:id',(request: Request, response:Response) => {
    const id = parseInt(request.params.id);
    console.log('Handling request for user with id: '+id );
    const user : any = userService.getUserById(id);
    console.log(user);
    if(user) {
        response.json(user);
    }else{
        response.sendStatus(404);
    }
    response.json(user);
});



userRouter.get('/users',(request: Request, response:Response) => {
    console.log('Querying database for users for fiance manager: ');
    //const usersQuery : any = userService.getUsers();
    //console.log(users);
    //if(users) {
    //    response.json(users);
    //}else{
    //    response.sendStatus(404);
    //}
 //   response.json(users);
});


userRouter.patch('/:id',(request: Request, response:Response) => {
    console.log('Patch called accepted id');
    //const usersQuery : any = userService.getUsers();
    //console.log(users);
    //if(users) {
    //    response.json(users);
    //}else{
    //    response.sendStatus(404);
    //}
 //   response.json(users);
});


export default userRouter;