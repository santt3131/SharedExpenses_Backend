const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("./config");
const db = require("./db");

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const userRouter = require("./resources/user/user.router");
app.use("/users", userRouter);

const groupRouter = require("./resources/group/group.router");
app.use("/groups", groupRouter);

const categoryRouter = require("./resources/category/category.router");
app.use("/categories", categoryRouter);

const expenseRouter = require("./resources/expense/expense.router");
app.use("/expenses", expenseRouter);

const startServer = async () => {
  await db.connect();
  app.listen(PORT, () => {
    console.log(`Shared Expense API listening on : ${PORT}`);
  });
};

startServer();
