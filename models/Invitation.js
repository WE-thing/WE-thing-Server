const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    inviteDescription: { type: String, required: true },
    weddingDateTime: { type: String, required: true },
    locationInfo: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

invitationSchema.set("toJSON", { virtuals: true });
invitationSchema.set("toObject", { virtuals: true });
invitationSchema.virtual("couples", {
  ref: "Couple",
  localField: "id",
  foreignField: "invitationId",
});

const Invitation = mongoose.model("Invitation", invitationSchema);
module.exports = Invitation;
