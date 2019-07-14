import express, { Request, Response} from 'express';
import User from '../models/User';
import * as userService from '../services/user-service';
import db, { closePool } from 'util/pg-connector';

const userRouter = express.Router();

userRouter.get('',
    async (request: any, response: Response) => {
        console.log(request.token);
        if(request.token.role ==2){
        const user = await userService.getUsers();
        if (user) {
            response.status(200).json(user);
        } else {
            response.sendStatus(404);
        }
    }
    else{
        response.status(401).json({
            message:"You are not authorized for this operation" 
        });
    }
    });

userRouter.get('/:id',
    async (request: Request, response: Response) => {
        const id = parseInt(request.params.id);
       // console.log(request.token);
        const user = await userService.getUserById(id);
        if (user) {
            response.status(200).json(user);
        } else {
            response.sendStatus(404);
        }
    });

userRouter.patch('/',
    async (request: Request, response: Response) => {
        const patch: User = new User(request.body);
        console.log(patch);
        const patchedUser: User = await userService.patchCoalese(patch);
        if (patchedUser.userId) {
            response.json(patchedUser);
        } else {

        }
        response.sendStatus(200);
    });


export default userRouter;
