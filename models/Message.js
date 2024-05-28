const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    invitationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Invitation",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

messageSchema.statics.mySave = async function ({
  roomId: invitationId,
  userId,
  message: content,
}) {
  try {
    const message = await this.create({ invitationId, userId, content });
    return {
      _id: message._id,
      invitationId: invitationId,
      userId: userId,
      content: message.content,
    };
  } catch (err) {
    throw err;
  }
};

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
