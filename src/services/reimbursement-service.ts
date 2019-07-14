import Reimbursement from '../models/reimbursements';
import db from '../util/pg-connector';
import { deepEqual } from 'assert';



export function createReimbursement(reimbursement: Reimbursement):
    Promise<Reimbursement[]> {
    // enforce business rules
    if (!reimbursement.author) {
        console.warn('Reimbursement item requires name');
    }
console.log(reimbursement);
//insert into reimbursement (author, amount, datesubmitted, description, status,reimbursementtype) values
//	(1, 89.39, '7-4-2019', 'lodging order',1, 1);
return db.query(`INSERT INTO  Reimbursement (author, amount, datesubmitted, description, status,reimbursementtype)
VALUES ($1, $2, $3, $4, $5, $6) RETURNING author, amount, datesubmitted, description, status,reimbursementtype`,
    [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.description, reimbursement.status, reimbursement.type])
    .then((data) => {
        return data.rows;
    }).catch((err) => {
        return [];
    });
}

export async function getReimbursementById(id: number): Promise<Reimbursement> {
    const result = await  db.query(`SELECT  * FROM reimbursement where reimbursementid =$1`, [id]);
    return result.rows[0];
}


export async function getReimbursementByStatus(StatusCode: number): Promise<Reimbursement> {
    const result = await db.query(`SELECT * FROM reimbursement where status =$1`, [StatusCode]);
    return result.rows;
}

export async function patchCoalese(patch: Reimbursement) {
//role, reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type;
    const result = await db.query(`UPDATE Reimbursement SET modify_amount = COALESCE($1, modify_amount),\
    modify_description = COALESCE($2, modify_description) WHERE userId = $3 \
    RETURNING role, reimbursementId, author, amount "amount" , description "description", dateSubmitted, dateResolved, resolver, status, type; `,
        [patch.amount, patch.description, patch.reimbursementId]);

    if (result.rowCount === 0) {
        // throw error, 404
    } else {
        return result.rows[0];
    }
}

    