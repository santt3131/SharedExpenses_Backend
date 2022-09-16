const mongoose = require("mongoose");
const { Schema } = mongoose;

const pendinguserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      maxlength: 100,
    },
    password: {
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

const pendinguser = mongoose.model("pendinguser", pendinguserSchema);
module.exports = pendinguser;
