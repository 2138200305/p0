import express, { Request, Response, request } from 'express';
import * as userService from '../services/user-service';
import User from '../models/User';
import Reimbursement from 'models/reimbursements';
const reimbursementsRouter = express.Router();

reimbursementsRouter.post('', (request: Request, response: Response) => {
   console.log('Handling post to reimbursements');
   const reimbursements= userService.createReimbursement(request.body);
   if(reimbursements){
       response.status(201).json(reimbursements);
   }else{
       response.sendStatus(500);
   }
});
   reimbursementsRouter.get('/:id',(request: Request, response:Response) => {
       const id = parseInt(request.params.id);
       console.log('Handling request for reimbursements with id:' +id);
       const reimbursements: Reimbursement = userService.getReimbursementById(id);
       console.log(reimbursements);
       if(reimbursements){
           response.json(reimbursements);
       }else{
           //Not found
           response.sendStatus(404);
       }
   
});
    
export default reimbursementsRouter ;