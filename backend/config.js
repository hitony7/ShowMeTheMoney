//change to ENV FILE and add to gitingore
const Sequelize = require('sequelize');
require("dotenv").config();

let database = 'robogarden_app';
let username = 'root';
let password = '';

const config = new Sequelize(database, username, password, {dialect: 'mariadb'});

module.exports = config;