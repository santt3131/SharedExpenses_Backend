const mongoose = require("mongoose");
const { Schema } = mongoose;

const pwdresetSchema = new Schema(
  {
   /* id: {
      type: String,
      required: true,
      maxlength: 100,
    },
    */
    email: {
      type: String,
      required: true,
      maxlength: 100,
    },
    code: {
      type: String,
      required: true,
      maxlength: 4,
    },/*
    expiration: {
      type: Date,
      //required: true,
    },*/
  },
  { versionKey: false }
);

const pwdreset = mongoose.model("pwdreset", pwdresetSchema);
module.exports = pwdreset;
