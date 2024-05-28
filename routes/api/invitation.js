var express = require("express");
var router = express.Router();
const User = require("../../models/Invitation");

router.post("/", async (req, res, next) => {
  const { id, inviteDescription, weddingDateTime, locationInfo } = req.body;

  Invitation.create({
    id: id,
    inviteDescription: inviteDescription,
    weddingDateTime: weddingDateTime,
    locationInfo: locationInfo,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400);
      next(err);
    });
});
