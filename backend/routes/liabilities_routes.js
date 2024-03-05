const express = require('express');
const router = express.Router();
const Liabilities = require('../models/liabilities');

// GET all liabilities based on user_id
router.get('/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const liabilities = await Liabilities.findAll({ where: { user_id } });
    res.json(liabilities);
  } catch (error) {
    console.error('Error fetching liabilities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new liability
router.post('/newEntry', async (req, res) => {
    try {
      const data = Array.isArray(req.body) ? req.body : [req.body]; // Check if the request body is an array
  
      const newLiabilities = await Promise.all(data.map(async (item) => {
        const { user_id, category, amount, note, date } = item;
        return await Liabilities.create({ user_id, category, amount, note, date });
      }));
  
      res.status(201).json(newLiabilities);
    } catch (error) {
      console.error('Error creating new liability:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;
