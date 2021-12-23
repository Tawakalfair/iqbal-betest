import express from 'express';
//import mongoose
import {db,redis} from './config/db.js';
// import routes
import user from './routes/user.routes.js';
//import cors
// import cors from "cors";
// construct express function
const app = express();
 
// connect ke database mongoDB
// const dbName = "db_iqbal_bootest";
// mongoose.connect(`mongodb://${process.env.HOSTMONGO}:${process.env.PORTMONGO}/${dbName}`);
// const db = mongoose.connection;

db(); 

redis();
app.use(express.json());
app.use('/user',user)

app.listen('3000',()=> console.log('Server Running at port: 3000'));