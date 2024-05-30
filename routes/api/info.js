const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const { authenticate } = require("./user");

router.get("/", authenticate, async (req, res) => {
  const user = await User.findById(req.user._id);

  const relationshipString =
    user.roleId === 1
      ? "신랑 본인"
      : user.roleId === 2
      ? "신부 본인"
      : user.relationshipString;
  const attend =
    user.attend === 1 ? "참석" : user.attend === 2 ? "불참" : "미정";
  const userCnt = await User.countDocuments();

  let result = {
    name: user.userName,
    phoneNumber: user.phoneNumber,
    relationshipNumber: user.relationshipNumber,
    relationshipString: relationshipString,
  };
  if (user.roleId === 1 || user.roleId === 2) {
    //신랑/신부라면
    result = {
      ...result,
      isMain: true, //프론트에서 받았을 때 신랑/신부인지 하객인지 구분용
      userCnt: userCnt,
    };
  } else {
    result = {
      ...result,
      isMain: false,
      attend: attend,
    };
  }

  res.send(result);
});

module.exports = router;
