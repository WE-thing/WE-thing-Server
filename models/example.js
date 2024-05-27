//예시 파일입니당 참고해서 필요한 스키마 만들어주세요 !

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    title: {type:String, required:true},
    content: {type:String, required:true},
    author: String,
    num: {
        type: Number
    }
    // createdAt: {type:Date, default: Date.now},
},
{
    timestamps: true,
    toJSON: {
        virtuals:true
    },
    toObject: {virtuals:true},
});


boardSchema.set('toJSON', {virtuals: true});
boardSchema.set('toObject', {virtuals: true});
boardSchema.virtual('comments', {
    ref: "Comment",
    localField: "_id",
    foreignField: "board"
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;