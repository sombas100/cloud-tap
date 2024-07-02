require('dotenv').config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import appointmentRoutes from './routes/appointment';
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 3000

// Cors
app.use(express.json());
app.use(cors<Request>());

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);


// Mongo setup
const uri: any = process.env.MONGODB_URI;
mongoose.connect(uri)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Error connecting to the database', err))

app.listen(PORT, () => {
    console.log(`Server is connected to PORT: ${PORT}`)
})

app.use(( err:any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next();
  });