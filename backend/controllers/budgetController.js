// controllers/budgetController.js

import Budget from '../models/budgetModel.js';

// Get all budgets for a user in a specific month
export const getBudgets = async (req, res) => {
  try {
    const month = req.params.month; // expected format: 'YYYY-MM'
    const userId = req.userId;

    const budgets = await Budget.find({ userId, month }).populate('categoryId');
    res.json(budgets);
  } catch (err) {
    console.error('Error in getBudgets:', err);
    res.status(500).json({ error: err.message });
  }
};

// Create or update a budget for a category & month
export const setBudget = async (req, res) => {
  try {
    const { categoryId, month, limit } = req.body;
    const userId = req.userId;

    if (!categoryId || !month || limit == null) {
      return res.status(400).json({ message: 'categoryId, month, and limit are required' });
    }

    const updatedBudget = await Budget.findOneAndUpdate(
      { userId, categoryId, month },
      { limit },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(updatedBudget);
  } catch (err) {
    console.error('Error in setBudget:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update a specific budget by its ID
export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    const updated = await Budget.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error in updateBudget:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a budget by ID
export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deleted = await Budget.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({ message: 'Budget deleted successfully' });
  } catch (err) {
    console.error('Error in deleteBudget:', err);
    res.status(500).json({ error: err.message });
  }
};
