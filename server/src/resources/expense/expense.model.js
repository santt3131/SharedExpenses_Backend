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
  users: {
    type: Array,
    required: true,
  },
  payments: {
    type: Array,
  },
});

const Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;
