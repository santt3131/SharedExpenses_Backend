const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
