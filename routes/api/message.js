var express = require("express");
var router = express.Router();
const Message = require("../../models/Message");

router.get("/:invitationId", async (req, res, next) => {
  try {
    Message.find({ invitationId: req.params.invitationId }).then((result) => {
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
