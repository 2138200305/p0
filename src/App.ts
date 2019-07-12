//import express , {Request, Response} from 'express';
//import * as express , {Request, Request} from 'express';
//import bodyParser from 'body-parser';
import * as bodyParser from 'body-parser';
import express from 'express';
//const bodyParser  = require('body-parser');
import userRouter from './routers/user-router';
import loginRouter from './routers/login-router';
import reimbursementsRouter from './routers/reimbursement-router';
import { closePool } from './util/pg-connector';

//Creating an instance of an express App by callng the express method
const app = express();

//process
const port = 3002;

//close the pool when app shuts down
process.on('SIGINT',  () => {
    closePool();
});

//Register middleware
app.use(bodyParser.json());

//Register Routers
app.use("/users", userRouter);
app.use("/login",  loginRouter);
app.use("/reimbursements",  reimbursementsRouter );


//Open port
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});