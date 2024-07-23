const Product = require('../models/Product');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['name']
        },
        {
          model: Subcategory,
          attributes: ['name']
        }
      ]
    });
    res.send(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['name']
        },
        {
          model: Subcategory,
          attributes: ['name']
        }
      ]
    });
    if (!product) return res.status(404).send('Product not found');
    res.send(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.addProduct = async (req, res) => {
  const { categoryId, subcategoryId, name, sequence, status } = req.body;
  const filename = req.file ? req.file.filename : null; // Check if req.file exists

  try {
    const product = new Product({ categoryId, subcategoryId, name, sequence, image: filename, status });
    await product.save();
    res.send(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Server error');
  }
};

exports.editProduct = async (req, res) => {
  const { categoryId, subcategoryId, name, sequence, status } = req.body;
  const filename = req.file ? req.file.filename : null; // Check if req.file exists

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    product.categoryId = categoryId;
    product.subcategoryId = subcategoryId;
    product.name = name;
    product.sequence = sequence;
    if (filename) product.image = filename; // Only update image if a new file is provided
    product.status = status;
    await product.save();

    res.send(product);
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).send('Server error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    await product.destroy();
    res.send('Product deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
};
