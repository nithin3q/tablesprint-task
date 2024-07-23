const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      include: [{
        model: Category,
        attributes: ['name']
      }]
    });
    res.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).send('Server error');
  }
};
exports.getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findOne({
      where: { id },
      include: [{ model: Category, attributes: ['name'] }],
    });

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.json(subcategory);
  } catch (error) {
    console.error('Error fetching subcategory by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.addSubcategory = async (req, res) => {
  const { categoryId, name, sequence, status } = req.body;
  const filename = req.file ? req.file.filename : null;

  try {
    const subcategory = await Subcategory.create({ categoryId, name, sequence, image: filename, status });
    res.send(subcategory);
  } catch (error) {
    console.error('Error adding subcategory:', error);
    res.status(500).send('Server error');
  }
};

exports.editSubcategory = async (req, res) => {
  const { categoryId, name, sequence, status } = req.body;
  const filename = req.file ? req.file.filename : null;

  try {
    const subcategory = await Subcategory.findByPk(req.params.id);
    if (!subcategory) return res.status(404).send('Subcategory not found');

    subcategory.categoryId = categoryId;
    subcategory.name = name;
    subcategory.sequence = sequence;
    if (filename) subcategory.image = filename;
    subcategory.status = status;
    await subcategory.save();

    res.send(subcategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).send('Server error');
  }
};

exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByPk(req.params.id);
    if (!subcategory) return res.status(404).send('Subcategory not found');

    await subcategory.destroy();
    res.send('Subcategory deleted');
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).send('Server error');
  }
};