const express = require("express");

const router = express.Router();

const userRouter = require("./user").router;

router.use("/album", require("./album"));
router.use("/user", userRouter);
router.use("/invitations", require("./invitations"));
router.use("/message", require("./message"));
router.use("/couple", require("./couple"));
router.use("/info", require("./info"));

module.exports = router;
