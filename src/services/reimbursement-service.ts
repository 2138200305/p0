import Reimbursement from '../models/reimbursements';
import db from '../util/pg-connector';
import { deepEqual } from 'assert';



export function createReimbursement(reimbursement: Reimbursement):

    Promise<Reimbursement[]> {
    // enforce business rules
    if (!reimbursement.author) {
        console.warn('Reimbursement item requires name');
    }

return db.query(`INSERT INTO  Reimbursement (role, author, amount, description, dateSubmitted, status, reimbursementType)
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING role, author, amount, description, dateSubmitted, status, type`,
    [reimbursement.role, reimbursement.author, reimbursement.amount, reimbursement.description, reimbursement.dateSubmitted, reimbursement.status, reimbursement.type])
    .then((data) => {
        return data.rows;
    }).catch((err) => {
        return [];
    });
}

export async function getReimbursementById(id: number): Promise<Reimbursement> {
    const result = await db.query(`SELECT id, item_name "author", amount
        FROM Reimbursement WHERE id = $1`, [id]);
    return new Reimbursement(result.rows[0]);
}

export async function getReimbursementByStatus(StatusCode: number): Promise<Reimbursement> {
    const result = await db.query(`SELECT id, item_name "author", amount
        FROM Reimbursement WHERE status = $1`, [StatusCode]);
    return new Reimbursement(result.rows[0]);
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

    