import Category from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.userId }).sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error('Error in getCategories:', err);
    res.status(500).json({ error: err.message });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name required' });
    }

    const category = await Category.create({
      name,
      color: color || '#000000',
      userId: req.userId,
    });
    res.status(201).json(category);
  } catch (err) {
    console.error('Error in addCategory:', err);
    res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await Category.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error in updateCategory:', err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const removed = await Category.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!removed) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error('Error in deleteCategory:', err);
    res.status(500).json({ error: err.message });
  }
};
