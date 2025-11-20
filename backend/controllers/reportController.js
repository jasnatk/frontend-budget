import Expense from '../models/expenseModel.js';
import Budget from '../models/budgetModel.js';
import Category from '../models/categoryModel.js';

import mongoose,{Types} from 'mongoose';

export const monthlyReport = async (req, res) => {
  try {
    const { month } = req.params;
    if (!/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({ message: 'month must be YYYY-MM' });
    }

    const start = new Date(`${month}-01T00:00:00.000Z`);
    const [yearStr, monStr] = month.split('-');
    const year = parseInt(yearStr, 10);
    const mon = parseInt(monStr, 10) - 1;
    const nextMonth = new Date(Date.UTC(year, mon + 1, 1));
    const end = new Date(nextMonth.getTime() - 1);

    const categories = await Category.find({ userId: req.userId }).lean();

    const expAgg = await Expense.aggregate([
      {
        $match: {
          userId:new Types.ObjectId(req.userId),
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: { _id: '$categoryId', total: { $sum: '$amount' } },
      },
    ]);

    const totalsByCat = {};
    expAgg.forEach(e => {
      totalsByCat[String(e._id)] = e.total;
    });

    const budgets = await Budget.find({ userId: req.userId, month }).lean();
    const budgetByCat = {};
    budgets.forEach(b => {
      budgetByCat[String(b.categoryId)] = b.limit;
    });

    const report = categories.map(cat => {
      const id = String(cat._id);
      const spent = totalsByCat[id] || 0;
      const limit = budgetByCat[id] || 0;
      return {
        categoryId: id,
        category: cat.name,
        color: cat.color,
        spent,
        budget: limit,
        remaining: limit - spent,
      };
    });

    res.json(report);
  } catch (err) {
    console.error('Error in monthlyReport:', err);
    res.status(500).json({ error: err.message });
  }
};
