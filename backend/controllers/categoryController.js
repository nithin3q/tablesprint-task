// controllers/categoryController.js
const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.addCategory = async (req, res) => {
  const { name, sequence, status } = req.body;
  const filename = req.file ? req.file.filename : null;

  try {
    const category = new Category({ name, sequence, image: filename, status });
    await category.save();
    res.send(category);
  } catch (error) {
    console.error('Error adding category:', error); // Enhanced error logging
    res.status(500).send('Server error');
  }
};
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send('Category not found');
    res.send(category);
  } catch (error) {
    res.status(500).send('Server error');
  }
};


exports.editCategory = async (req, res) => {
  const { name, sequence, status } = req.body;
  const filename = req.file ? req.file.filename : null;

  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send('Category not found');

    category.name = name;
    category.sequence = sequence;
    if (filename) category.image = filename;
    category.status = status;
    await category.save();

    res.send(category);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send('Category not found');

    await category.destroy();
    res.send('Category deleted');
  } catch (error) {
    res.status(500).send('delete subcategory and try again');
  }
};
