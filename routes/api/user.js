var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const { createToken, verifyToken } = require("../../utils/auth");

async function authenticate(req, res, next) {
  let headerToken = req.headers.authorization;
  if (headerToken) {
    const user = verifyToken(headerToken);
    req.user = user;
    next();
  }
  else req.user = null;
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
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User aleady exist" });
    }

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

router.get("/:id", async (req, res) => {
  try {
    const user = await User.find({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  authenticate,
  router,
};
