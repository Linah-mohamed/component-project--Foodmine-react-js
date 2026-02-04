import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import chatRouter from './routers/chatRouter.js';
import uploadRouter from './routers/upload.router.js';

import { sample_foods } from './data.js';
import { dbconnect } from './config/database.config.js';

dotenv.config(); 

// Connect to Database
dbconnect();

// Create Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'], 
}));

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API Routes
app.get('/api/sample-foods', (req, res) => {
  res.json(sample_foods);
});

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/chat', chatRouter);
app.use('/api/upload', uploadRouter);


// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
