const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionContent: { type: String, require: true},//true: bắt buộc phải có nội dung
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
}, {
    timestamps: true //tạo ra created_at, updated_at cho field
});



module.exports = mongoose.model("Question", questionSchema); //Tên model + tên schema