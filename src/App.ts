//import express , {Request, Response} from 'express';
//import * as express , {Request, Request} from 'express';
//import bodyParser from 'body-parser';
//const bodyParser  = require('body-parser');

import * as bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';

import userRouter from './routers/user-router';
import loginRouter from './routers/login-router';
import reimbursementRouter from './routers/reimbursement-router';

import { closePool } from './util/pg-connector';


//Creating an instance of an express App by callng the express method
const app = express();

//process
const port = process.env.port||3007;

//close the pool when app shuts down
process.on('SIGINT',  async () => {
    await closePool();
});

//Register middleware
app.use(bodyParser.json());

app.use(session({
    resave:false,
    saveUnitialized:true,
    secret:'my-secret',

}));

//Register Routers
app.use("/users", userRouter);
app.use("/login",  loginRouter);
app.use("/reimbursements",  reimbursementRouter);


//Open port
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});