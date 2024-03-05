const express = require('express');
require("dotenv").config();
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth_routes');
const transactionRoutes = require('./routes/transaction_routes');
const userRoutes = require('./routes/user_routes');
const incomeRoutes = require('./routes/income_routes');
const expenseRoutes = require('./routes/expense_routes');
const config = require('./config');

//Global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Test DB connection
config.authenticate().then(() => {
    console.log('Database is connected')
}).catch((err) => {
    console.log(err);
});

//register routes
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);
app.use('/user', userRoutes);
app.use('/income', incomeRoutes);
app.use('/expense', expenseRoutes);

const PORT = 3000;
app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
});