const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const { authenticate } = require("./user");

router.get('/', authenticate, async(req, res) => {
    // console.log("유저유저\n",req.user);
    const user = await User.findById(req.user._id)
    console.log("유저유저\n",user);
    let attend = (user.attend===1) ? "참석" : (user.attend===2) ? "불참" : "미정";
    const result = {
        name: user.userName,
        phoneNumber: user.phoneNumber,
        relationshipString: user.relationshipString,
        attend: attend,
    }

    res.send(result);
})

module.exports = router;