const express = require("express");

const router = express.Router();

router.use("/album", require("./album"));
router.use("/user", require("./user"));


module.exports = router;
