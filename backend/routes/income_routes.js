const express = require('express');
const router = express.Router();
const Income = require('../models/income');

// Route to handle POST request to insert a new row of data
router.post('/newEntry', async (req, res) => {
  try {
    // Extract data from request body
    const { user_id, source, amount, date, note } = req.body;

    // Create a new income record
    const newIncome = await Income.create({
      user_id,
      source,
      amount,
      date,
      note
    });

    // Send a success response with the newly created income record
    res.status(201).json({ success: true, data: newIncome });
  } catch (error) {
    // If an error occurs, send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
