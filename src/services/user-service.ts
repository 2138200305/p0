import User from "../models/User";
import Reimbursement from "../models/reimbursements";
import db from "../util/pg-connector";
import { promises } from "dns";

let userCounter: number = 1;

let reimbursementCounter = 1;

export async function validateUser(username: string, password: string){
    const result = await db.query(`select user_id, username,firstname,lastname,email,user_role from users where username = $1 and user_password = $2;`,
    [username, password]);
    console.log(result.rows);
    return result.rows[0];
    } 

export function createReimbursement(reimbursement): Reimbursement {
    //deprecated
    //reimbursement.reimbursementId = reimbursementCounter++;
    return reimbursement;
}

export async  function getUsers(): Promise<User[]>{
    const result = await  db.query(`SELECT  user_id, username,firstname,lastname,email,user_role FROM "users" `);
    return result.rows;

}


export async function getUserById(userId: number): Promise<User>{
    const result = await  db.query(`SELECT  userid, username,firstname,lastname,email,role FROM "users" where userId =$1`, [userId]);
    return result.rows[0];
}

export async function patchCoalese(patch: User) {
    console.log("print variables" , patch.username, patch.password, patch.firstName, patch.lastName, patch.email, patch.role, patch.userId);
    const result = await db.query(`UPDATE users SET 
            username = COALESCE($1, username),\
            user_password = COALESCE($2, password),
            firstname = COALESCE($3, firstname),
            lastname = COALESCE($4, lastname),
            email = COALESCE($5, email),
            user_role = COALESCE($6, role)
            WHERE user_id = $7 
            RETURNING userid, username, firstname, lastname, email, role;`,
         [patch.username, patch.password, patch.firstName, patch.lastName, patch.email, patch.role, patch.userId]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}
