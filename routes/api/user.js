var express = require("express");
var router = express.Router();
const User = require("../../models/User");

router.post("/signup", async (req, res, next) => {
  const {
    id,
    userName,
    roleId,
    phoneNumber,
    relationShipNumber,
    relationShipString,
    attend,
  } = req.body;

  User.create({
    id: id,
    userName: userName,
    roleId: roleId,
    phoneNumber: phoneNumber,
    relationShipNumber: relationShipNumber,
    relationShipString: relationShipString,
    attend: attend,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400);
      next(err);
    });
});

module.exports = router;
