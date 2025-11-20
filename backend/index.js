import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/budgets', budgetRoutes);
app.use('/expenses', expenseRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_CONNECTION_LINK, {})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
