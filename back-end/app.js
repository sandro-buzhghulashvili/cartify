import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import clientRouter from './routes/Auth/Client/ClientRoutes.js';
import authRouter from './routes/Auth/AuthRoutes.js';
import companyRouter from './routes/Auth/Company/CompanyRoutes.js';
import wizardsRouter from './routes/Wizards/Wizards.js';
import cors from 'cors';
import { connectDB } from './db/connectDB.js';

dotenv.config();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from any origin
      callback(null, origin || '*');
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', companyRouter);
app.use('/api/auth', clientRouter);
app.use('/api/auth', authRouter);
app.use('/wizards', wizardsRouter);

app.get('/', (req, res) => {
  console.log('hello');
  res.send('Welcome to cartify backend');
});

app.listen(5000, () => {
  connectDB();
  console.log('Listening on port 5000');
});
