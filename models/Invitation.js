const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
  galleryImageUrl: {
    type: String, // 필수 항목 아님
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

// 플러그인 설정
invitationSchema.plugin(AutoIncrement, { inc_field: "id", start_seq: 1 });

const Invitation = mongoose.model("Invitation", invitationSchema);
module.exports = Invitation;
