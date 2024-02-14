const Sequelize = require('sequelize');
const config = require('../config');

const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  hashed_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false
  },
  image: {
    type: DataTypes.BLOB,
    defaultValue: null
  }
});

module.exports = User;
