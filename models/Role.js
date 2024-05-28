const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
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

roleSchema.set("toJSON", { virtuals: true });
roleSchema.set("toObject", { virtuals: true });
roleSchema.virtual("users", {
  ref: "User",
  localField: "id",
  foreignField: "roleId",
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
