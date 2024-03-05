const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// POST request to insert a new row of expense data
router.post('/newEntry', async (req, res) => {
  try {
    let inputData = req.body;

    // Check if inputData is an array or a single object
    if (!Array.isArray(inputData)) {
      // If it's a single object, convert it to an array
      inputData = [inputData];
    }

    // Create an array to store the newly created expense records
    const newExpenses = [];

    // Iterate over each input data
    for (const data of inputData) {
      // Create a new expense record using data from the current iteration
      const newExpense = await Expense.create(data);
      
      // Push the newly created expense record to the array
      newExpenses.push(newExpense);
    }

    // Send the created expense records as JSON response
    res.status(201).json(newExpenses);
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error creating new expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET request to retrieve expense records by user ID
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find all expense records associated with the specified user ID
    const expenses = await Expense.findAll({ where: { user_id: userId } });
    res.status(200).json(expenses); // Send the expense records as JSON response
  } catch (error) {
    console.error('Error retrieving expense records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
