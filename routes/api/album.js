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
  console.log(pics);
});

const addFiles = async (req, res) => {
  let pictureUrls = [];
  console.log(req.headers);
  if (req.files && req.files.length > 0) {
    pictureUrls = req.files.map((file) => file.location); // S3 URL 추출
    console.log(pictureUrls);

    console.log("picture: ", pictureUrls);
    const exist = await Album.findOne({ userId: req.params.userId });
    if (exist) {
      const existingUrls = JSON.parse(exist.imageUrl);
      const combinedUrls = existingUrls.concat(pictureUrls);
      exist.imageUrl = JSON.stringify(combinedUrls);
      await exist.save();
    } else {
      const cnt = await Album.countDocuments();
      await Album.create({
        id: cnt + 1,
        imageUrl: JSON.stringify(pictureUrls),
        userId: req.params.userId,
      });
    }
    console.log("finish Logic");
    res.send("end");
  } else {
    // 사진이 첨부되지 않았을 경우의 처리
    return res.send("no image");
  }
};

router.post("/:userId", setAlbumDirectory, imageUploader.array("image"), addFiles);

module.exports = router;
