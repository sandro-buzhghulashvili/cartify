import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import clientAuthRouter from './routes/Auth/Client/ClientRoutes.js';
import authRouter from './routes/Auth/AuthRoutes.js';
import companyAuthRouter from './routes/Auth/Company/CompanyRoutes.js';
import wizardsRouter from './routes/Wizards/Wizards.js';
import companyRouter from './routes/Company/Company.js';
import productsRouter from './routes/Products/Products.js';
import cors from 'cors';
import { connectDB } from './db/connectDB.js';

import Product from './models/Product.js';

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

app.get('/update-types-structure', async (req, res) => {
  try {
    const products = await Product.find();

    for (const product of products) {
      const types = product.types.map((type) => ({ type: type, addition: 0 }));

      await Product.updateOne(
        { _id: product._id },
        { $set: { category: product.types[0], types } }
      );
    }

    res.send('worked');
  } catch (error) {
    res.status(500).send('Error updating types structure');
  }
});

app.use('/api/auth', companyAuthRouter);
app.use('/api/auth', clientAuthRouter);
app.use('/api/auth', authRouter);
app.use('/wizards', wizardsRouter);
app.use('/company', companyRouter);
app.use('/products', productsRouter);

app.listen(5000, () => {
  connectDB();
  console.log('Listening on port 5000');
});
