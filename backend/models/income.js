const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./user');

const Income = sequelize.define('income', {
  income_id: {
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
  source: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(20, 6),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  note: {
    type: DataTypes.STRING,
    defaultValue: null
  }
});

module.exports = Income;
