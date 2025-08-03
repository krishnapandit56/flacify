const express = require('express');
const router = express.Router();
const historyModel = require('../Schemas/historySchema');
const verifyToken = require('../Middlewares/verifyToken');

router.post('/', verifyToken, async (req, res) => {
  const { spawn } = require('child_process');
  const username = req.body.username;
  console.log('body is : ', username);

  const rawPreferences = await historyModel.find({ username });

  const userPreferences = rawPreferences
    .filter(p => p && p.mood && p.genre && p.language)
    .map(p => ({
      mood: p.mood,
      genre: p.genre,
      language: p.language,
    }));

  const python = spawn('python', ['suggest_songs.py']);

  let output = '';
  let error = '';

  python.stdout.on('data', (data) => {
    output += data.toString();
  });

  python.stderr.on('data', (data) => {
    error += data.toString();
  });

  python.on('close', (code) => {
    if (error) {
      console.error('❌ Python Error:\n', error);
      return res.status(500).json({ error: 'Python script error' });
    }

    try {
      const songs = JSON.parse(output);
      console.log("🎵 Suggested Songs:");
      songs.forEach((song, index) => {
        console.log(`${index + 1}. ${song.songname} - ${song.singer}`);
      });

      if(!songs){
        return res.json([])
      }

      // ✅ Send response here
      return res.json({ songs });

    } catch (err) {
      console.error('❌ Failed to parse Python output:', err.message);
      console.log('Raw output was:', output);
      return res.status(500).json({ error: 'Invalid JSON from Python' });
    }
  });

  // Send preferences to Python via stdin
  python.stdin.write(JSON.stringify(userPreferences));
  python.stdin.end();
});

module.exports = router;
