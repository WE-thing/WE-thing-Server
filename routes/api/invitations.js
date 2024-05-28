var express = require("express");
var router = express.Router();
const Invitation = require("../../models/Invitation");

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

router.get("/:invitationId", async (req, res, next) => {
  try {
    Invitation.findById(req.params.invitationId).then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json("존재하지 않는 청첩장입니다.");
      }
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

module.exports = router;
