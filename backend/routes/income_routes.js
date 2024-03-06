const express = require('express');
const router = express.Router();
const Income = require('../models/income');
const  Expense  = require('../models/expense'); // Import Expense model

// Route to handle GET request to retrieve recent transactions
router.get('/recenttransaction/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    // Retrieve the 5 most recent income transactions for the provided user ID
    const recentIncomes = await Income.findAll({
      where: { user_id },
      attributes: [
        'income_id',
        'user_id',
        'source',
        'amount',
        'date'
      ],
      order: [['date', 'DESC']], // Order by date in descending order
      limit: 5 // Limit the results to 5 rows
    });

    // Retrieve the 5 most recent expense transactions for the provided user ID
    const recentExpenses = await Expense.findAll({
      where: { user_id },
      attributes: [
        'expense_id',
        'user_id',
        'category',
        'amount',
        'date'
      ],
      order: [['date', 'DESC']], // Order by date in descending order
      limit: 5 // Limit the results to 5 rows
    });

    // If no recent transactions found, send a 404 response
    if ((!recentIncomes || recentIncomes.length === 0) && (!recentExpenses || recentExpenses.length === 0)) {
      return res.status(404).json({ success: false, error: 'No recent transactions found for the provided user ID' });
    }

    // Combine income and expense transactions and sort them by date in descending order
    const combinedTransactions = [...recentIncomes, ...recentExpenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    // Send the retrieved recent transactions as a response
    res.status(200).json({ success: true, data: combinedTransactions });
  } catch (error) {
    // If an error occurs, send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
// Route to handle POST request to insert a new row of data
router.post('/newEntry', async (req, res) => {
  try {
    let inputData = req.body;

    // Check if inputData is an array or a single object
    if (!Array.isArray(inputData)) {
      // If it's a single object, convert it to an array
      inputData = [inputData];
    }

    // Create an array to store the newly created income records
    const newIncomes = [];

    // Iterate over each input data
    for (const data of inputData) {
      // Extract data from current iteration
      const { user_id, source, amount, date, note } = data;

      // Create a new income record
      const newIncome = await Income.create({
        user_id,
        source,
        amount,
        date,
        note
      });

      // Push the newly created income record to the array
      newIncomes.push(newIncome);
    }

    // Send a success response with the newly created income records
    res.status(201).json({ success: true, data: newIncomes });
  } catch (error) {
    // If an error occurs, send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


// Route to handle GET request to retrieve income records by user ID
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find all income records that match the provided user ID
    const userIncome = await Income.findAll({
      where: {
        user_id: user_id
      }
    });

    // If no income records found, send a 404 response
    if (!userIncome || userIncome.length === 0) {
      return res.status(404).json({ success: false, error: 'No income records found for the provided user ID' });
    }

    // Send the retrieved income records as a response
    res.status(200).json({ success: true, data: userIncome });
  } catch (error) {
    // If an error occurs, send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
