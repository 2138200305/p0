import User from "../models/User";
import Reimbursement from "../models/reimbursements";
import db from "../util/pg-connector";
import { promises } from "dns";

let userCounter: number = 1;

const reimbursementMap: Map<Number, Reimbursement> = new Map();
let reimbursementCounter = 1;

export async function validateUser(username: string, password: string){
    const result = await db.query(`select * from users where username like $1 and user_password like $2;`,
    [username, password]);
    return result.rows;

        // .then((data) => {
        //     return data.rows;
        // }).catch((err) => {
        //     return [];
        // });
    } 

export function createReimbursement(reimbursement): Reimbursement {
    reimbursement.reimbursementId = reimbursementCounter++;
    return reimbursement;
}

export async  function getUsers(): Promise<User[]>{
    const result = await  db.query(`SELECT  * FROM "users" `);
    return result.rows;

}


// export async function getUsers() {
//     const result = await db.query
//     let users : User[] = [];
//     for (let i of  result.rows){
//         users.push(i);
//     }
//     return users;
// }


export async function getUserById(userId: number): Promise<User>{
    const result = await  db.query(`SELECT  * FROM "users" where user_id =$1`, [userId]);
    return result.rows[0];
}

// export function getReimbursementById(id: number) {
//     //Todo search for Reimbursement by id
//     return reimbursementMap.get(id);
// }

export async function patchCoalese(patch: User) {
    const result = await db.query(`UPDATE User SET first_name = COALESCE($1, first_name),\
    last_name = COALESCE($2, last_name) WHERE userId = $3 \
    RETURNING username , password , firstName "first_name" , lastName "last_name" , email ,role, userId ; `,
        [patch.firstName, patch.lastName, patch.userId]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}
