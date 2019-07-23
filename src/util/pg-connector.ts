import { Pool } from 'pg';

const db = new Pool({
database: 'postgres',
    host: 'localhost', // process.env.REIMBURSEMENT_URL 
    password: 'password', // process.env.REIMBURSEMENT_PASSWORD ||
    port: 5432,
    user: 'postgres', // process.env.REIMBURSEMENT_USER || 
});

export function closePool(){
    db.end();
}

export default db;