import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import config from 'config';
import cors from 'cors';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors())

import auth from './auth/routes';

app.use('/api/auth', auth)

// Create and start connection
const port: number = parseInt(<string>process.env.PORT) || 5000;
app.listen(port, () => console.log('Server running'));

// Set database
const db: string = config.get('mongoURI')

// Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))