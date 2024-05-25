const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    imageUrl: {type: String, required: true},
    userId: {
        type: String,
        required: true,
        ref: "User",
    },
},
{
    timestamps: true,
});

const Album = mongoose.model("Album", albumSchema());
module.exports = Album;