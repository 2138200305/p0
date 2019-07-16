import Reimbursement from '../models/reimbursements';
import * as reimbursementService from '../services/reimbursement-service';
import express, { Request, Response, request } from 'express';
import db from '../util/pg-connector';
import Role from 'models/Role';
import { createReimbursement } from 'services/user-service';
const reimbursementRouter = express.Router();


reimbursementRouter.post('', async (request: Request, response: Response) => {

    const info:Reimbursement = request.body;
    //console.log(request.body);
    console.log(info);
    let reimbursement = await reimbursementService.createReimbursement(info);
    if (reimbursement) {
        response.status(200).json(reimbursement);
    } else {
        response.sendStatus(404);
    }


});


reimbursementRouter.get('/status/:statusId',
    async (request: any, response: Response) => {
        const statusCode = parseInt(request.params.statusId)

        console.log(request.token.role);
        if(request.token.role ==2){
        const reimbursement: Reimbursement = await reimbursementService.getReimbursementByStatus(statusCode);

        if (reimbursement) {
            response.status(200).json(reimbursement);
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


reimbursementRouter.get('/author/:userId',
    async (request: any, response, Response) => {
        const id = parseInt(request.params.id);
        // if (request.session.role == 1&& request.session.uid != id ){
        //     response.sendStatus(404);
        // }
        console.log(id);
        const reimbursement: Reimbursement = await reimbursementService.getReimbursementByAuthorId(id);

        if (reimbursement) {
            response.status(200).json(reimbursement);
        } else {
            response.sendStatus(404);
        }
    });

reimbursementRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: Reimbursement = request.body;
        console.log(patch);
        const patchedR: any = await reimbursementService.patchCoalese(patch);
        
        console.log(patchedR);
        if (patchedR.reimbursementid) {
         
            response.status(200).json(patchedR);
        } else {
            response.sendStatus(404);
        }

    });


export default reimbursementRouter;