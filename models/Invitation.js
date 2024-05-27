const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  inviteDescription: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  weddingDateTime: {
    type: Date,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  locationAddress: {
    type: String,
    required: true,
  },
  locationContact: {
    type: String,
    required: true,
  },
  themeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    required: true,
  },
  mainPhoto: {
    type: String,
    required: true,
  },
});

const Invitation = mongoose.model("Invitation", invitationSchema);
module.exports = Invitation;
