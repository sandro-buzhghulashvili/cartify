import express from 'express';
const app = express();
import dotenv from 'dotenv';
import clientRouter from './routes/Client/ClientRoutes.js';
import authRouter from './routes/Auth/AuthRoutes.js';
import { connectDB } from './db/connectDB.js';

dotenv.config();

app.use(express.json());

app.use('/api/auth', clientRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  console.log('hello');
  res.send('Welcome to cartify backend');
});

app.listen(3000, () => {
  connectDB();
  console.log('Listening on port 3000');
});
