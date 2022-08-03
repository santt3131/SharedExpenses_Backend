const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT,FRONTEND_DIR } = require("./config");
const db = require("./db");
const { errorHandler, TodosApiError } = require("./errors");

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/",express.static(FRONTEND_DIR));

const loginRouter = require("./resources/login/login.route");
app.use("/login", loginRouter);

const userRouter = require("./resources/user/user.route");
app.use("/users", userRouter);

const groupRouter = require("./resources/group/group.route");
app.use("/groups", groupRouter);

const categoryRouter = require("./resources/category/category.route");
app.use("/categories", categoryRouter);

const expenseRouter = require("./resources/expense/expense.route");
app.use("/expenses", expenseRouter);

/*app.all("/*", async (req, res, next) => {next(new TodosApiError(404, `Not Found`));
});*/
const emailRouter = require("./resources/email/email.route");
app.use("/email", emailRouter);

const startServer = async () => {
  await db.connect();
  app.listen(PORT, () => {
    console.log(`Shared Expense API listening on : ${PORT}`);
  });
};

startServer();
