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


export async function getUserById(userId: number): Promise<User>{
    const result = await  db.query(`SELECT  * FROM "users" where user_id =$1`, [userId]);
    return result.rows[0];
}

// export function getReimbursementById(id: number) {
//     //Todo search for Reimbursement by id
//     return reimbursementMap.get(id);
// }

// export async function patchCoalese(patch: User) {
//     const result = await db.query(`UPDATE "users" SET firstName = COALESCE($1, firstName),\
//     lastName = COALESCE($2, lastName),\
//     username = COALESCE($3, username),\
//     password = COALESCE($4, password),\
//     email = COALESCE($5, email),\
//     role = COALESCE($6, role)
//      WHERE userId = $7 
//     RETURNING userId, firstName, lastName, username, password, email, role ; `,
//         [patch.firstName, patch.username, patch.lastName, patch.password, patch.email,patch.role, patch.userId]);

//     if (result.rowCount === 0) {
//         // throw error, 404
//     } else {
//         return result.rows[0];
//     }
// }
export async function patchCoalese(patch: User) {
    console.log("print variables" , patch.username, patch.password, patch.firstName, patch.lastName,  patch.email, patch.role, patch.userId);
    const result = await db.query(`UPDATE users SET 
    username = COALESCE($1, username),
    user_password = COALESCE($2, user_password),
    firstname = COALESCE($3, firstname),
    lastname = COALESCE($4, lastname),
    email = COALESCE($5, email),
    user_role = COALESCE($6, user_role)
    WHERE user_id = $7 
    RETURNING user_id "userId", username, user_password, firstname, lastname, email, user_role;`,
        [patch.username, patch.password, patch.firstName, patch.lastName,  patch.email, patch.role, patch.userId]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}