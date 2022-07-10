const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  groupDescription: {
    type: String,
    required: true,
    maxlength: 100,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
