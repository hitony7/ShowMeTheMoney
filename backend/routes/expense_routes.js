const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// POST request to insert a new row of expense data
router.post('/newEntry', async (req, res) => {
  try {
    // Create a new expense record using data from the request body
    const newExpense = await Expense.create(req.body);
    res.status(201).json(newExpense); // Send the created expense record as JSON response
  } catch (error) {
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
