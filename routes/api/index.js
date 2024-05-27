const router = require("express").Router();

router.use("/album", require("./album"));

module.exports = router;
