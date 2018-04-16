const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    avatar: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true},
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model("users", userModel);