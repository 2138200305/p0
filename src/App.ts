import express , {Request, Response} from 'express';
//import * as express , {Request, Request} from 'express';
//import bodyParser from 'body-parser';
import * as bodyParser from 'body-parser';
//const bodyParser  = require('body-parser');
import userRouter from './routers/user-router';
import loginRouter from './routers/login-router';
import reimbursementsRouter from './routers/reimbursement-router';
//Creating an instance of an express App by callng the express method
const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/login",  loginRouter);
app.use("/reimbursement",  reimbursementsRouter );


//starting the server on port 3002
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});