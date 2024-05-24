const mongoose = require("mongoose");

const coupleSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    userName: { type: String, required: true},
    role_id: {
      type: Number,
      required: true,
      ref: "Role",
    },
    phoneNumber: { type: String, required: true},
    relationShipNumber: { type: Number, required: true},
    relationShipString: { type: String, required: true},
    attend: Number,
  },
  {
    timestamps: true,
  }
);

const Couple = mongoose.model("Couple", coupleSchema());
module.exports = Couple;
