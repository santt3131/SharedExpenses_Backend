const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  categoryId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  expenseTotal: {
    type: Schema.Types.Decimal128,
    required: true,
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

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;
