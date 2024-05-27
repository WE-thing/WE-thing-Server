const express = require('express');
const router = express.Router();

const Album = require('../../models/Album');

router.get('/:id', async (req, res) => {
    const pics = await Album.find({id:req.params.id});
    if (pics.length === 0) {
        return res.status(404).json({ message: 'Albums not found' });
    }
    res.json(pics);
    console.log('pics');
});

module.exports = router;