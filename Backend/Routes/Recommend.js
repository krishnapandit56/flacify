const express = require('express');
const router = express.Router();
const axios = require('axios');
const historyModel = require('../Schemas/historySchema');
const verifyToken = require('../Middlewares/verifyToken');

router.post('/', verifyToken, async (req, res) => {
  try {
    const username = req.user.username;

    const rawPreferences = await historyModel.find({ username });

    const userPreferences = rawPreferences
      .filter(p => p && p.mood && p.genre && p.language)
      .map(p => ({
        mood: p.mood,
        genre: p.genre,
        language: p.language,
      }));

    const response = await axios.post('https://your-python-api.onrender.com/recommend', {
      preferences: userPreferences,
    });

    const songs = response.data;

    if (!songs || songs.length === 0) {
      return res.json({ songs: [] });
    } else {
      return res.json({ songs });
    }

  } catch (err) {
    console.error('❌ Python API error:', err.message);
    return res.status(500).json({ error: 'Recommendation service failed' });
  }
});

module.exports = router;
