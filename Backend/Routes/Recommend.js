const express = require('express');
const router = express.Router();
const axios = require('axios');
const historyModel = require('../Schemas/historySchema');
const verifyToken = require('../Middlewares/verifyToken');

router.post('/', verifyToken, async (req, res) => {
try {
  const username = req.user?.username;
  console.log("👤 Username from token:", username);

  if (!username) {
    return res.status(400).json({ error: 'Username not found in token' });
  }

  const rawPreferences = await historyModel.find({ username });
  console.log("📦 Raw preferences:", rawPreferences.length);

  const userPreferences = rawPreferences
    .filter(p => p && p.mood && p.genre && p.language)
    .map(p => ({
      mood: p.mood,
      genre: p.genre,
      language: p.language,
    }));

  console.log("🎯 Filtered preferences:", userPreferences);

  const response = await axios.post('https://flacify-1.onrender.com/recommend', {
    preferences: userPreferences,
  });

  const songs = response.data;
  console.log("🎵 Songs from Python:", songs.length);

  return res.json({ songs });

} catch (err) {
  console.error('❌ Python API error:', err);
  return res.status(500).json({ error: 'Recommendation service failed' });
}

});

module.exports = router;
