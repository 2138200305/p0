import Reimbursement from '../models/reimbursements';
import * as reimbursementService from '../services/reimbursement-service';
import express, { Request, Response, request } from 'express';
import db from '../util/pg-connector';
const reimbursementRouter = express.Router();


reimbursementRouter.post('',
    (request: Request, response: Response) => {
        const reimbursement = new Reimbursement(request.body);

        reimbursementService.createReimbursement(reimbursement)
            .then((rows) => {
                if (rows.length > 0) {
                    response.status(201).json(rows[0]);
                } else {
                    response.sendStatus(400);
                }
            });


    });


reimbursementRouter.get('/:statusCode',
    async (request: Request, response, Response) => {
        const statusCode = parseInt(request.params.id);

        const reimbursement: Reimbursement = await reimbursementService.getReimbursementByStatus(statusCode);

        //show a map of reimbursements
        let reimbursementMap: Map<Number, Reimbursement> = new Map();
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