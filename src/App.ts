
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';

import userRouter from './routers/user-router';
import loginRouter from './routers/login-router';

import reimbursementRouter from './routers/reimbursement-router';

import { closePool } from './util/pg-connector';
import checkToken from './util/validateToken';

//process
const port = process.env.port||3000;

//Creating an instance of an express App by callng the express method
const app = express();

//close the pool when app shuts don
// process.on('SIGINT',  async () => {
//     await closePool();
// });

//Register middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    resave:false,
    saveUnitialized:true,
    secret:'my-secret',
}));

//Register Routers
//app.use("/users", checkToken, userRouter);
app.use("/users", userRouter);
app.use("/login",   loginRouter);
//app.use("/reimbursements", checkToken,  reimbursementRouter);
app.use("/reimbursements",  reimbursementRouter);

//Open port
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});