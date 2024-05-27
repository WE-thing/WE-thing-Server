const express = require('express');
const router = express.Router();
const { imageUploader } = require('../../middleware/image.uploader');

const Album = require('../../models/Album');

const setAlbumDirectory = (req, res, next) => {
    req.query.directory = `album/${req.params.id}`;
    next();
};

router.get('/:id', async (req, res) => {
    const pics = await Album.find({id:req.params.id});
    if (pics.length === 0) {
        return res.status(404).json({ message: 'Albums not found' });
    }
    res.json(pics);
    console.log('pics');
});

router.post('/:id', setAlbumDirectory, imageUploader.array('image'), postImage);

module.exports = router;