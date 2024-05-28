const express = require("express");

const router = express.Router();

router.use("/album", require("./album"));
router.use("/user", require("./user"));
router.use("/invitations", require("./invitations"));

module.exports = router;
