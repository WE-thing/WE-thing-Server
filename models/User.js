const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    userName: { type: String, required: true },
    roleId: {
      type: Number,
      required: true,
      ref: "Role",
    },
    phoneNumber: { type: String, required: true },
    relationshipNumber: { type: Number, required: true },
    relationshipString: { type: String, required: true },
    attend: Number,
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });
userSchema.virtual("albums", {
  ref: "Album",
  localField: "id",
  foreignField: "userId",
});

userSchema.statics.login = async function (userName, phoneNumber) {
  const user = await this.findOne({ phoneNumber });
  if (user) {
    console.log(user);
    const auth = user.userName === userName;
    if (auth) {
      return user.visibleUser;
    }
    throw Error("일치하는 이름이 없습니다.");
  }
  throw Error(
    "일치하는 번호가 없습니다.\n참석 여부를 제출했는지 확인해주세요."
  );
};

const visibleUser = userSchema.virtual("visibleUser");
visibleUser.get(function (value, virtual, doc) {
  return {
    _id: doc._id,
    userName: doc.userName,
  };
});

const User = mongoose.model("User", userSchema);
module.exports = User;
