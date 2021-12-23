import express from 'express';

import {db,redis} from './config/db.js';

import user from './routes/user.routes.js';

const app = express();
 


db(); 

redis();
app.use(express.json());
app.use('/user',user)

app.listen('3000',()=> console.log('Server Running at port: 3000'));