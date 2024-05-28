const express = require("express");

const router = express.Router();

router.use("/album", require("./album"));
router.use("/user", require("./user"));
router.use("/invitation", require("./invitation"));

module.exports = router;
