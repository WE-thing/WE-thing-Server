const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const invitationSchema = new mongoose.Schema(
  {
    inviteDescription: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    weddingDateTime: {
      type: String,
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
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
    },
    galleryImageUrl: {
      type: Array, // 필수 항목 아님
    },
    themeId: {
      type: Number,
      required: true,
    },
    mainPhoto: {
      type: String,
      required: true,
    },
    expireDateTime: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedDate: {
      type: Date,
    },
    person1: {
      type: String,
      require: true,
    },
    person2: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 플러그인 설정
invitationSchema.plugin(AutoIncrement, { inc_field: "id", start_seq: 1 });
invitationSchema.set("toJSON", { virtuals: true });
invitationSchema.set("toObject", { virtuals: true });
invitationSchema.virtual("couples", {
  ref: "Couple",
  localField: "id",
  foreignField: "invitationId",
});

// weddingDateTime에 기반하여 expireDateTime을 설정하는 pre-save 미들웨어
invitationSchema.pre("save", function (next) {
  if (this.isNew) {
    const weddingDateStr = this.weddingDateTime;
    const year = parseInt(weddingDateStr.substring(0, 4), 10);
    const month = parseInt(weddingDateStr.substring(4, 6), 10) - 1; // JavaScript의 월은 0부터 시작
    const day = parseInt(weddingDateStr.substring(6, 8), 10);
    const hour = parseInt(weddingDateStr.substring(8, 10), 10);

    const weddingDate = new Date(Date.UTC(year, month, day, hour));
    const expireDate = new Date(weddingDate);
    expireDate.setDate(weddingDate.getUTCDate() + 7); // 결혼식 후 7일 추가
    expireDate.setUTCHours(23, 59, 0, 0); // 23:59로 설정

    this.expireDateTime = expireDate.toISOString();
  }
  next();
});

const Invitation = mongoose.model("Invitation", invitationSchema);
module.exports = Invitation;
