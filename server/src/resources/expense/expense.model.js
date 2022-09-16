const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
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
      type: Schema.Types.Decimal128,
    },
    users: [
      {
        debt: {
          type: Schema.Types.Decimal128,
          required: true,
        },
        paid: {
          type: Schema.Types.Decimal128,
          required: true,
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        amountShouldPay: {
          type: Schema.Types.Decimal128,
          required: true,
        },
      },
    ],
    payments: [
      {
        date: {
          type: Date,
          required: true,
        },
        note: {
          type: String,
        },
        userFromId: {
          type: String,
          required: true,
        },
        userToId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Schema.Types.Decimal128,
          required: true,
        },
      },
    ],
  },
  { versionKey: false }
);

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
