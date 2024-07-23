// models/Subcategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');

const Subcategory = sequelize.define('Subcategory', {
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
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

Subcategory.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Subcategory;
