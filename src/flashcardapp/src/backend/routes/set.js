const express = require('express');
const Set = require('../models/Set');

const router = express.Router();

// search sets
router.get('/search', async (req, res) => {
    console.log("Inside the Damn thing");
    try {
        const { query } = req.query;
        console.log("Query: ", query );
        if (!query) return res.json([]);

        const results = await Set.find({
            name: { $regex: query, $options: 'i' } // Case-insensitive match
        }).limit(5); // Limit recommendations

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all sets
router.get('/', async (req, res) => {
    try {
        const sets = await Set.find();
        res.json(sets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one set
router.get('/:id', getSet, (req, res) => {
    res.json(res.set);
});

// Create one set
router.post('/save', async (req, res) => {

    console.log(req.body);
    const set = new Set({
        name: req.body.setName,
        course: req.body.selectedCourse,
        accountId: "1234",
        description: req.body.setDescription,
        flashcards: req.body.flashcards,
    });
    console.log(set);
    try {
        const newSet = await set.save();
        res.status(201).json(newSet);
    } catch (err) {
        res.status(400).json({ message: err.message });
        //check why it failed
        
    }
});

// Update one set
router.patch('/:id', getSet, async (req, res) => {
    if (req.body.name != null) {
        res.set.name = req.body.name;
    }
    if (req.body.description != null) {
        res.set.description = req.body.description;
    }
    if (req.body.flashcards != null) {
        res.set.flashcards = req.body.flashcards;
    }

    try {
        const updatedSet = await res.set.save();
        res.json(updatedSet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one set
router.delete('/:id', getSet, async (req, res) => {
    try {
        await res.set.remove();
        res.json({ message: 'Deleted Set' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getSet(req, res, next) {
    let set;
    try {
        set = await Set.findById(req.params.id);
        if (set == null) {
            return res.status(404).json({ message: 'Cannot find set' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.set = set;
    next();
}

module.exports = router;