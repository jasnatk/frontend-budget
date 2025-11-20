import Expense from '../models/expenseModel.js';
import Budget from '../models/budgetModel.js';
import mongoose,{Types} from 'mongoose';

// Helper to get month string 'YYYY-MM' from a Date
function monthStringFromDate(d) {
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  return `${y}-${m}`;
}

export const addExpense = async (req, res) => {
  try {
    const { categoryId, amount, date, description } = req.body;
    if (!categoryId || amount == null) {
      return res.status(400).json({ message: 'categoryId and amount required' });
    }

    const expenseDate = date ? new Date(date) : new Date();

    const expense = await Expense.create({
      categoryId,
      amount,
      date: expenseDate,
      description,
      userId: req.userId,
    });

    // Calculate spent for that category in the month
    const monthStr = monthStringFromDate(expenseDate);
    const start = new Date(`${monthStr}-01T00:00:00.000Z`);
    const year = expenseDate.getFullYear();
    const monthIndex = expenseDate.getMonth();
    const nextMonth = new Date(Date.UTC(year, monthIndex + 1, 1));
    const end = new Date(nextMonth.getTime() - 1);

    const agg = await Expense.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(req.userId),
          categoryId:new Types.ObjectId(categoryId),
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: { _id: null, total: { $sum: '$amount' } },
      },
    ]);

    const spent = agg[0]?.total || 0;
    const budget = await Budget.findOne({
      userId: req.userId,
      categoryId,
      month: monthStr,
    });

    let status = 'within-budget';
    if (budget && spent > budget.limit) {
      status = 'over-budget';
    }

    res.status(201).json({ expense, status, spent, budgetLimit: budget?.limit || 0 });
  } catch (err) {
    console.error('Error in addExpense:', err);
    res.status(500).json({ error: err.message });
  }
};
