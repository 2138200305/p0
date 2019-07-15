import Reimbursement from '../models/reimbursements';
import db from '../util/pg-connector';
import { deepEqual } from 'assert';



export function createReimbursement(reimbursement: Reimbursement):
    Promise<Reimbursement[]> {
    // enforce business rules
    console.log(reimbursement)
    if (!reimbursement.author) {
        console.warn('Reimbursement item requires name');
    }
console.log(reimbursement);
//insert into reimbursement (author, amount, datesubmitted, description, status,reimbursementtype) values
//	(1, 89.39, '7-4-2019', 'lodging order',1, 1);
return db.query(`INSERT INTO  reimbursement (author, amount, datesubmitted, description, status,reimbursementtype)
VALUES ($1, $2, $3, $4, $5, $6) RETURNING author, amount, datesubmitted, description, status,reimbursementtype`,
    [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.description, reimbursement.status, reimbursement.type])
    
    .then((data) => {
        return data.rows;
    }).catch((err) => {
        return [];
    });
}

export async function getReimbursementByAuthorId(id: number): Promise<Reimbursement> {
    const result = await  db.query(`SELECT  * FROM reimbursement where author =$1`, [id]);
    return result.rows;
}


export async function getReimbursementByStatus(StatusCode: number): Promise<Reimbursement> {
    const result = await db.query(`SELECT * FROM reimbursement where status =$1`, [StatusCode]);
    return result.rows;
}

export async function patchCoalese(patch: Reimbursement) {
    console.log("print variables" , patch.amount, patch.description, patch.reimbursementId);
//role, reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type;
//reimbursementid|author|amount|datesubmitted|dateresolved|description |resolver|status|reimbursementtype| 
const result = await db.query(`UPDATE reimbursement SET     
    amount = COALESCE($1, amount),\
    dateresolved = COALESCE($2, dateresolved) ,
    description = COALESCE($3, description),
    resolver = COALESCE($4, resolver) 
    WHERE reimbursementid = $5 \
    RETURNING reimbursementid, author, amount,description, datesubmitted, dateresolved, resolver, status, reimbursementtype; `,
    [patch.amount, patch.dateResolved, patch.description, patch.resolver, patch.reimbursementId]);
    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}

// export async function patchCoalese(patch: User) {
//     console.log("print variables" , patch.username, patch.password, patch.firstName, patch.lastName, patch.email, patch.role, patch.userId);
//     const result = await db.query(`UPDATE users SET 
//             username = COALESCE($1, username),\
//             password = COALESCE($2, password),
//             firstname = COALESCE($3, firstname),
//             lastname = COALESCE($4, lastname),
//             email = COALESCE($5, email),
//             role = COALESCE($6, role)
//             WHERE userid = $7 
//             RETURNING userid, username, password, firstname, lastname, email, role;`,
//          [patch.username, patch.password, patch.firstName, patch.lastName, patch.email, patch.role, patch.userId]);

//     if (result.rowCount === 0) {
//         // throw error, 404
//     } else {
//         return result.rows[0];
//     }
// }

    