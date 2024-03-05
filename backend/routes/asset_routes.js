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

// POST a new asset
router.post('/newEntry', async (req, res) => {
  try {
    const { user_id, category, amount, note, date } = req.body;
    const newAsset = await Assets.create({ user_id, category, amount, note, date });
    res.status(201).json(newAsset);
  } catch (error) {
    console.error('Error creating new asset:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;