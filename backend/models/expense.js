const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./user');

const Expense = sequelize.define('expense', {
  expense_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(20, 6),
    allowNull: false
  },
  note: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Expense;
