const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    role: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// role 빼고는 createAt 추가하기

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });
userSchema.virtual("users", {
  ref: "User",
  localField: "id",
  foreignField: "role_id",
});

const Role = mongoose.model("Role", roleSchema());
module.exports = Role;
