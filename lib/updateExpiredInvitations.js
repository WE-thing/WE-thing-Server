require("dotenv").config();
const mongoose = require("mongoose");
const Invitation = require("./models/Invitation"); // Invitation 모델 경로에 맞게 수정하세요

// MongoDB 연결 설정
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
  updateExpiredInvitations();
});

async function updateExpiredInvitations() {
  try {
    const now = new Date();

    // 만료된 초대장을 찾아 업데이트
    const result = await Invitation.updateMany(
      {
        expireDateTime: { $lt: now.toISOString() },
        deleted: false,
      },
      {
        $set: {
          deleted: true,
          deletedDate: now,
        },
      }
    );

    console.log(`${result.nModified} invitations updated as expired.`);
  } catch (error) {
    console.error("Error updating invitations:", error);
  } finally {
    mongoose.connection.close();
  }
}
