const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs"); //ma hoa password

const userModel = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(value) {
          const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return regex.test(value);
        },
        message: "{VALUE} is not a valid email address!"
      }
    },
    avatar: { type: String, default: "" },
    active: { type: Boolean, default: true }
  },
  { timestamps: { createdAt: "createdAt" } }
);

//bcryptjs chỉ mã hóa chứ không giải mã được, khi muốn kiểm tra pass của user ta phải mã hóa để so sánh
userModel.pre("save", function(next) {
  if (!this.isModified("password")) { // TODO bug on update password
    console.log("Modified");
    return next();
  }

  bcrypt
    .genSalt(12) //lấy ngẫu nhiên 12 ký tự theo 1 thuật toán thêm vào sau pass
    .then(salt => bcrypt.hash(this.password, salt)) //mã hóa
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => next(err));
});

module.exports = mongoose.model("users", userModel);