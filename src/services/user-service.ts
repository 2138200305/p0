import User from "../models/User";
import Reimbursement from "../models/reimbursements";
import db from "../util/pg-connector";
import { promises } from "dns";

// let userCounter: number = 1;
// let reimbursementCounter = 1;


//localhost:4339/login tested Post Tues pm
export async function validateUser(username: string, password: string) {
    const result = await db.query(`select user_id, username,firstname,lastname,email,user_role from users where username = $1 and user_password = $2;`,
        [username, password]);
    console.log(result.rows);
    return result.rows[0];
}


//localhost:4339/users/ Get example Tested Tues pm
export async function getUsers(): Promise<User[]> {
    const result = await db.query(`SELECT  user_id, username,firstname,lastname,email,user_role FROM "users" `);
    return result.rows;

}
//localhost:4339/users/1 Get example Tested Tues pm
export async function getUserById(userId: number): Promise<User> {
    const result = await db.query(`SELECT  user_id, username,firstname,lastname,email,user_role FROM "users" where user_id =$1`, [userId]);
    return result.rows[0];
}

/* Patch example localhost:4339/users/ Tested Tues pm
{
    "userId": 1,
    "username": "jaenwawe",

    "firstName": "Jae",
    "lastName": "Nwawe",
    "email": "nwawe.jae@gmail.com",
    "role": 2
}
*/
export async function patchCoalese(patch: User) {
    console.log("print variables", patch.username, patch.password, patch.firstName,
        patch.lastName, patch.email, patch.role, patch.userId);
    const result = await db.query(`UPDATE users SET
            username = COALESCE($1, username),
            firstname = COALESCE($2, firstname),
            lastname = COALESCE($3, lastname),
            email = COALESCE($4, email),
            user_role = COALESCE($5, user_role)
            WHERE user_id = $6
            RETURNING user_id, username, firstname, lastname, email, user_role;`,
        [patch.username, patch.firstName, patch.lastName, patch.email, patch.role, patch.userId]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}
