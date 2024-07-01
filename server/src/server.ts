require('dotenv').config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cors<Request>());

const uri: any = process.env.MONGODB_URI;
mongoose.connect(uri)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Error connecting to the database', err))

app.listen(PORT, () => {
    console.log(`Server is connected to PORT: ${PORT}`)
})

app.use((err:any, req:Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });