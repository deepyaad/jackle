// entry point
import 'dotenv/config'; // load env variables
import express from 'express';
import database from './config/db.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';

const app = express()
app.use(express.json());

//connect database
database();

// routes
app.use('/api/auth', authRoute);
app.use('api/users', userRoute); // this is where users would interact with the database

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server is running on ${PORT}`));