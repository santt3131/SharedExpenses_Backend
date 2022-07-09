const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  category: {
    type: String,
    required: true,
    maxlength: 150,
  },
  image: {
    type: String,
    required: true,
    maxlength: 200,
  },
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
