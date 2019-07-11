import User from "../models/User";
import Reimbursement from "../models/reimbursements";

let userCounter: number = 1;
const userMap: Map<Number, User> = new Map();
const reimbursementMap: Map<Number, Reimbursement> = new Map();
let reimbursementCounter =1;

export function createUser(user): User {
    user.userId = userCounter++;
   // registering key-value parseInt
   //so I can later  retrieve cat by id
userMap.set(user.userId, user);
return user;
}



export function createReimbursement(reimbursement): Reimbursement {
reimbursement.reimbursementId = reimbursementCounter++;
return reimbursement;
}


export function getUserById(userId:number){
return userMap.get(userId);
}

export function getReimbursementById(id:number){
//Todo search for Reimbursement by id
return reimbursementMap.get(id);
}

