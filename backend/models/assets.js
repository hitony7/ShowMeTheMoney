const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./user');

const Assets = sequelize.define('assets', {
  asset_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
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
    defaultValue: null
  }
  
}
, {
  timestamps: false // This will tell Sequelize not to include createdAt and updatedAt columns
})

module.exports = Assets;
