const mongoose = require("mongoose");
//const { loginn } = require("./user.controllers");
const { Schema } = mongoose;

const loginSchema = new Schema(
  {
  
    email: {
      type: String,
      required: true,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 12,
    }
  },
  { versionKey: false }
);

const loginn = mongoose.model("loginn", loginSchema);
module.exports = loginn;
