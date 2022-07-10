const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  expenseTotal: {
    type: Decimal128,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  payments: {
    type: Array,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
