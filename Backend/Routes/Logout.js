const express = require('express')
const router = express.Router()


router.post('/', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, // Set to true if you're using HTTPS
    sameSite: 'strict'
  });
  res.json({ message: 'Logged out successfully' ,logoutstatus:true });
  console.log('logout sucessully')
});

module.exports = router;
