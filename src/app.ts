import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import { verifyToken } from './middleware/authMiddleware';
dotenv.config();

const app = express();

app.use(express.json());

const disableCorsForRoute = (req: Request, res: Response, next: NextFunction) => {

  res.set('Access-Control-Allow-Origin', '*');

  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
};


app.use('/api/auth', disableCorsForRoute, authRoutes);
app.use('/api/products', verifyToken, productRoutes);

const PORT = process.env.PORT || 3334;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
