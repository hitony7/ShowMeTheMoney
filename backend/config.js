//change to ENV FILE and add to gitingore
const Sequelize = require('sequelize');
require("dotenv").config();

let database = process.env.DATABASE;
let username = process.env.DB_USERNAME;
let password = process.env.PASSWORD;

const config = new Sequelize(database, username, password, {dialect: 'mariadb'});

module.exports = config;