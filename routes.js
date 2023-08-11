const express = require('express');
const router = express.Router();

const Player = require('./models/Player'); // Create this model as explained earlier

router.get('/players/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    res.render('player', { player });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
