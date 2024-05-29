var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const { createToken } = require("../../utils/auth");

async function authenticate(req, res, next) {
  let headerToken = req.headers.authorization;
  if (!token && headerToken) {
    token = headerToken.split(" ")[1];
  }
  token = token.length > 0 ? token : null;
  const user = verifyToken(token);
  req.user = user;
  next();
}

async function loginRequired(req, res, next) {
  if (!req.user) {
    const error = new Error("login Required.");
    error.status = 403;
    next(error);
  }
  next();
}

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
    relationshipNumber,
    relationshipString,
    attend,
  } = req.body;

  try {
    User.create({
      id: id,
      userName: userName,
      roleId: roleId,
      phoneNumber: phoneNumber,
      relationshipNumber: relationshipNumber,
      relationshipString: relationshipString,
      attend: attend,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400);
        next(err);
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { userName, phoneNumber } = req.body;
    const user = await User.login(userName, phoneNumber);
    const tokenMaxAge = 60 * 60 * 24 * 3;
    const token = createToken(user, tokenMaxAge);

    user.token = token;

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
    // next(err);
  }
});

module.exports = router;
