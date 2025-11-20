
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String },
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
