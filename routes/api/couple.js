var express = require("express");

const Couple = require("../../models/Couple");
var router = express.Router();
// 모든 커플 조회
router.get("/", async (req, res) => {
  try {
    const couples = await Couple.find();
    res.status(200).json(couples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 커플id로 조회
router.get("/:_id", async (req, res) => {
  try {
    const couples = await Couple.findById(req.params._id);
    if (!couples) {
      return res.status(404).json({ message: "couples not found" });
    }
    res.status(200).json(couples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new couples
router.post("/", async (req, res) => {
  try {
    const couple = new Couple(req.body);
    await couple.save();
    res.status(201).json(couple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
