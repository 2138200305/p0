import Reimbursement from '../models/reimbursements';
import * as reimbursementService from '../services/reimbursement-service';
import express, { Request, Response, request } from 'express';
import db from '../util/pg-connector';
import Role from 'models/Role';
//import { createReimbursement } from 'services/user-service';
const reimbursementRouter = express.Router();


/* localhost:4339/reimbursements Post tested Tuesday pm
{

    "author": 2,
    "amount": "200.00",
    "dateSubmitted": "2019-07-01T05:00:00.000Z",
    "dateResolved": "2019-07-24T04:00:00.000Z",
    "description":"Tuesday PM",
    "resolver": 2,
    "status": 1
}*/


reimbursementRouter.post('', async (request: any, response: Response) => {

    const info: Reimbursement = request.body;
    // console.log(request.body);
    console.log(info, "reimbursementRouter Post method");
    console.log(request.token.role);
    if (request.token.role > 0) {
        let reimbursement = await reimbursementService.createReimbursement(info);
        if (reimbursement) {
            response.status(200).json(reimbursement);
        } else {
            response.sendStatus(404);
        }
    } else {
        response.status(401).json({
            message: "You are not authorized for this operation"
        });
    }
});

/*localhost:4339/reimbursements/status/1 Get tested Tuesday pm

 */

reimbursementRouter.get('/status/:statusId',
    async (request: any, response: Response) => {
        const statusCode = parseInt(request.params.statusId);
        console.log(statusCode);
        const reimbursement: Reimbursement[] = await reimbursementService.getReimbursementByStatus(statusCode);
        console.log(reimbursement);
        if (request.token.role == 2) {
            if (reimbursement) {
                response.status(200).json(reimbursement);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.status(401).json({
                message: "You are not authorized for this operation"
            });
        }
    });

/*localhost:4339/reimbursements/author/1 Get tested Tuesday pm
 */

reimbursementRouter.get('/author/:id',
    async (request: any, response, Response) => {
        const id = parseInt(request.params.id);
        console.log(id);
        console.log('/author/:id', id, 'request.token.userid', request.token.userid);
        if (request.token.role == 2 || request.token.userid == id) {
            const reimbursement: Reimbursement[] = await reimbursementService.getReimbursementByAuthorId(id);
            if (reimbursement) {
                response.status(200).json(reimbursement);
            } else {
                response.sendStatus(404);
            }

        } else
            response.status(401).json({ message: "You are not authorized for this operation" });
    });


/*localhost:4339/reimbursements Patch tested Tuesday pm

 
{

"role": 1,
"reimbursementId": 1,
"author": 1,
"amount": 100.00,
"dateSubmitted": "7-21-2018",
"dateResolved": "7-23-2018",
"description": "Tuesday tested",
"resolver": 2,
"status":2 ,
"type": 1
	
	
}
*/

reimbursementRouter.patch('',
    async (request: any, response: Response) => {
        const patch: Reimbursement = request.body;
        console.log(patch);

        if (request.token.role == 2) {
            const result: any = await reimbursementService.patchCoalese(patch);
            const patchedR = new Reimbursement(result);
            console.log(patchedR);
            if (patchedR.reimbursementId) {

                response.status(200).json(patchedR);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.status(401).json({
                message: "You are not authorized for this operation"
            });
        }
    });


export default reimbursementRouter;