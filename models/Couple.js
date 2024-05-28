const mongoose = require("mongoose");

const coupleSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    invitationId: {
      type: Number,
      required: true,
      ref: "Invitation",
    },
    coupleId: { type: Object, required: true },
    account: { type: Object, required: true },
    guestSum: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

const Couple = mongoose.model("Couple", coupleSchema());
module.exports = Couple;
