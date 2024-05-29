const mongoose = require("mongoose");
const User = require("./User");
const { verifyToken } = require("../utils/auth");

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
    roleId: {
      type: Number,
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
  token,
  message: content,
}) {
  try {
    const user = verifyToken(token);
    const { roleId } = await User.findById(user._id);
    const message = await this.create({
      invitationId,
      userId: user._id,
      roleId,
      content,
    });
    return {
      _id: message._id,
      invitationId: invitationId,
      userId: user._id,
      content: message.content,
      roleId: roleId,
    };
  } catch (err) {
    throw err;
  }
};

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
