import express, { Request, Response} from 'express';
import User from '../models/User';
import * as userService from '../services/user-service';
import db, { closePool } from 'util/pg-connector';

const userRouter = express.Router();

userRouter.get('',
    async (request: any, response: Response) => {
        console.log(request.token);
        console.log(request.token.role);
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
    async (request: any, response: Response) => {
        const id = parseInt(request.params.id);
       // console.log(request.token);
       console.log(request.token);
       console.log('userRouter.get', id);
       console.log('userRouter.get', request.token.role);
       console.log('userRouter.get', request.token.userid);

       if(request.token.role ==2 || request.token.userid==id){
       
        const userById = await userService.getUserById(id);
        let user = new User(userById);  
        if (user) {
            response.status(200).json(user);
        } else {
            response.sendStatus(404);
        }
    }else{
            response.status(401).json({
                message:"You are not authorized for this operation" 
            });
        }
    });

userRouter.patch('/',
    async (request: any, response: Response) => {
        const patch: User = new User(request.body);
        
        console.log(patch);

        if(request.token.role ==2){
        const patchedUser: User = await userService.patchCoalese(patch);
            if (patchedUser.userId) {
                response.json(patchedUser);
            } else {
                response.sendStatus(200);
            }
        }else{
            response.status(401).json({
                message:"You are not authorized for this operation" 
            });
        }
    });
export default userRouter;
