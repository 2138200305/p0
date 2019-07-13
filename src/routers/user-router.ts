import express, { Request, Response, request } from 'express';
import User from '../models/User';
import * as userService from '../services/user-service';

const userRouter = express.Router();


// console.log('Handling request for user with id: ' + id);
//const user: any = userService.getUserById(id);
//console.log(user);


userRouter.get('/:id',
    async (request: Request, response: Response) => {
        const id = parseInt(request.params.id);

        const item: User = await userService.getUserById(id);

        if (item.userId) {
            response.status(200).json(item);
        } else {
            response.sendStatus(404);
        }
    });


userRouter.get('/users', (request: Request, response: Response) => {
    //console.log('Querying database for users for fiance manager: ');
    async (request: Request, response: Response) => {
        let userMap: Map<Number, User> = new Map();
        userMap = await userService.getUsers();

        if (sessionStorage.userId && sessionStorage.password && (sessionStorage.role = 2)) {
            //iterate through map.
            response.status(200).json(userMap);
        } else {
            response.sendStatus(404);
        }
    };


    userRouter.patch(' ',
        async (request: Request, response: Response) => {
            const patch: User = request.body;

            const patchedUser: User = await userService.patchCoalese(patch);
            if (patchedUser.userId) {
                response.json(patchedUser);
            } else {

            }
            response.sendStatus(200);
        });


    });
export default userRouter;
