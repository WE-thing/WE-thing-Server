const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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

userSchema.set("toJSON", {virtuals: true});
userSchema.set("toObject", {virtuals: true});
userSchema.virtual("albums", {
  ref: "Album",
  localField: "id",
  foreignField: "userId",
});

const User = mongoose.model("User", userSchema());
module.exports = User;
