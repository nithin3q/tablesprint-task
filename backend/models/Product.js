const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');
const Subcategory = require('./Subcategory');

const Product = sequelize.define('Product', {
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  },
  subcategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subcategory,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sequence: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false
  }
});

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.belongsTo(Subcategory, { foreignKey: 'subcategoryId' });

module.exports = Product;
