const express = require("express");
const Invitation = require("../models/Invitation"); // Invitation 모델의 경로에 맞게 수정하세요

const router = express.Router();

// Create a new invitation
router.post("/", async (req, res) => {
  try {
    const invitation = new Invitation(req.body);
    await invitation.save();
    res.status(201).json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all invitations
router.get("/", async (req, res) => {
  try {
    const invitations = await Invitation.find();
    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single invitation by MongoDB _id
router.get("/:_id", async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params._id);
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }
    res.status(200).json(invitation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an invitation by MongoDB _id
router.patch("/:_id", async (req, res) => {
  try {
    const invitation = await Invitation.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }
    res.status(200).json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an invitation by MongoDB _id
router.delete("/:_id", async (req, res) => {
  try {
    const invitation = await Invitation.findByIdAndDelete(req.params._id);
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }
    res.status(200).json({ message: "Invitation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an invitation by auto-increment id
router.delete("/auto/:id", async (req, res) => {
  try {
    const invitation = await Invitation.findOneAndDelete({ id: req.params.id });
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }
    res.status(200).json({ message: "Invitation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
