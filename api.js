const express = require('express');
const router = express.Router();

// Import the Player model (assuming it's defined in Player.js)
const Player = require('./models/Player');

// Define API routes
router.get('/players', async (req, res) => {
    try {
        const players = await Player.find({});
        res.json(players);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add more API routes as needed
router.get('/players/:id', async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json(player);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


router.get('/players/search', async (req, res) => {
    try {
        const query = req.query.q; // Get the search query from request query parameters
        const players = await Player.find({ name: { $regex: query, $options: 'i' } });
        res.json(players);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.delete('/players/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json({ message: 'Player deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.put('/players/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json(player);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.post('/players', async (req, res) => {
    try {
        const newPlayer = new Player(req.body);
        const player = await newPlayer.save();
        res.status(201).json(player);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


module.exports = router;
