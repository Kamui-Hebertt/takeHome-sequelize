import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import { verifyToken } from './middleware/authMiddleware';

dotenv.config();

const app = express();

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', verifyToken, productRoutes);

const PORT = process.env.PORT || 3334;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// "start": "ts-node src/app.ts",