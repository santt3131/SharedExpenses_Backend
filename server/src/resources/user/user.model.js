const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
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
      minlength: 9,
      maxlength: 100,
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    friends: [
      {
        friendId: {
          type: String,
        },
        friendName: {
          type: String,
          required: true,
        },
        friendEmail: {
          type: String,
          required: true,
        },
        invitationId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
