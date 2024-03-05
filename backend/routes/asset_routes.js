const express = require('express');
const router = express.Router();
const Assets = require('../models/assets');

// GET all assets based on user_id
router.get('/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const assets = await Assets.findAll({ where: { user_id } });
    res.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new asset or multiple assets
router.post('/newEntry', async (req, res) => {
    try {
      // Check if the request body is an array or a single object
      const data = Array.isArray(req.body) ? req.body : [req.body];
  
      // Create an array to store the created assets
      const createdAssets = [];
  
      // Iterate through each input data and create assets
      for (const item of data) {
        const { user_id, category, amount, note, date } = item;
  
        // Create a new asset record
        const newAsset = await Assets.create({ user_id, category, amount, note, date });
  
        // Push the created asset to the array
        createdAssets.push(newAsset);
      }
  
      // Send the created assets as a JSON response
      res.status(201).json(createdAssets);
    } catch (error) {
      // If an error occurs, send an error response
      console.error('Error creating new asset:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;