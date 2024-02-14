const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./user');

const Goals = sequelize.define('goals', {
  goals_id: {
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
  end_amount: {
    type: DataTypes.DECIMAL(20, 6),
    allowNull: false
  },
  current_amount: {
    type: DataTypes.DECIMAL(20, 6),
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  note: {
    type: DataTypes.STRING,
    defaultValue: null
  }
});

module.exports = Goals;
