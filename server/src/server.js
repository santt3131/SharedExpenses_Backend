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

const userRouter = require("./resources/user/user.route");
app.use("/users", userRouter);

const groupRouter = require("./resources/group/group.route");
app.use("/groups", groupRouter);

const categoryRouter = require("./resources/category/category.route");
app.use("/categories", categoryRouter);

const expenseRouter = require("./resources/expense/expense.route");
app.use("/expenses", expenseRouter);

const emailRouter = require("./resources/email/email.route");
app.use("/email", emailRouter);

const startServer = async () => {
  await db.connect();
  app.listen(PORT, () => {
    console.log(`Shared Expense API listening on : ${PORT}`);
  });
};

startServer();
