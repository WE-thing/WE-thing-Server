var express = require("express");
var router = express.Router();
const User = require("../../models/User");

/**
 * POST ~/api/user/signup
 * 회원가입
 */
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

router.get("/login", async (req, res, next) => {
  const { userName, phoneNumber } = req.body;

  try {
    User.findOne({
      userName: userName,
      phoneNumber: phoneNumber,
    }).then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json("존재하지 않는 사용자입니다.");
      }
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

module.exports = router;
