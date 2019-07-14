import { Pool } from 'pg';

const db = new Pool({
database: 'postgres',
    host: process.env.REIMBURSEMENT_URL || 'localhost',
    password: process.env.REIMBURSEMENT_PASSWORD || 'password',
    port: 5432,
    user: process.env.REIMBURSEMENT_USER || 'user',
});

export function closePool(){
    db.end();
}

export default db;