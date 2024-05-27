const express = require("express");
const router = express.Router();
const { imageUploader } = require("../../middleware/image.uploader");

const Album = require("../../models/Album");

const setAlbumDirectory = (req, res, next) => {
  req.query.directory = "album";
  next();
};

router.get("/:id", async (req, res) => {
  const pics = await Album.find({ id: req.params.id });
  res.send(pics);
});

const addFiles = async (req, res) => {
  let pictureUrls = [];
  if (req.files && req.files.length > 0) {
    pictureUrls = req.files.map((file) => file.location); // S3 URL 추출
  } else {
    // 사진이 첨부되지 않았을 경우의 처리
    return res.send("IMAGE_NOT_EXIST");
  }
  const exist = await Album.findOne({ userId: req.params.userId });
  if (exist) {
    const existingUrls = JSON.parse(exist.imageUrl);
    const combinedUrls = existingUrls.concat(pictureUrls);
    await Album.updateOne(
      { userId: req.params.userId },
      { imageUrl: JSON.stringify(combinedUrls) }
    );
  } else {
    const cnt = await Album.countDocuments();
    await Album.create({
      id: cnt + 1,
      imageUrl: JSON.stringify(pictureUrls),
      userId: req.params.userId,
    });
  }
  res.send("The End");
};

router.post(
  "/:userId",
  setAlbumDirectory,
  imageUploader.array("image"),
  addFiles
);

module.exports = router;
