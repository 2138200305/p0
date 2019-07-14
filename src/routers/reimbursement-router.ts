import Reimbursement from '../models/reimbursements';
import * as reimbursementService from '../services/reimbursement-service';
import express, { Request, Response, request } from 'express';
import db from '../util/pg-connector';
import Role from 'models/Role';
import { createReimbursement } from 'services/user-service';
const reimbursementRouter = express.Router();


reimbursementRouter.post('', async (request: Request, response: Response) => {

    const info = request.body;
    let reimbursement = await reimbursementService.createReimbursement(info);

});

reimbursementRouter.get('/:statusCode',
    async (request: Request, response, Response) => {
        const statusCode = parseInt(request.params.id);

        const reimbursement: Reimbursement = await reimbursementService.getReimbursementByStatus(statusCode);

        //show a map of reimbursements
    
        //iterate over each key below
        if (reimbursement.reimbursementId) {
            response.status(200).json(reimbursement);
        } else {
            response.sendStatus(404);
        }
    });


reimbursementRouter.get('/:id',
    async (request: Request, response, Response) => {
        const id = parseInt(request.params.id);

        const reimbursement: Reimbursement = await reimbursementService.getReimbursementById(id);

        if (reimbursement.reimbursementId) {
            response.status(200).json(reimbursement);
        } else {
            response.sendStatus(404);
        }
    });

reimbursementRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: Reimbursement = request.body;

        const patchedR: Reimbursement = await reimbursementService.patchCoalese(patch);

        if (patchedR.reimbursementId) {
            response.json(patchedR)
        } else {

        }
        response.sendStatus(200);
    });

export default reimbursementRouter;