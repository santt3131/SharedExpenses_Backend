const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("./config");
const db = require("./db");

//creamos el objeto de express
const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const UserRouter = require("./resources/user/user.route");
app.use("/users", UserRouter);

const GroupRouter = require("./resources/group/group.route");
app.use("/groups", GroupRouter);

const CategoryRouter = require("./resources/category/category.router");
app.use("/categories", CategoryRouter);

const startServer = async () => {
  await db.connect();
  app.listen(PORT, () => {
    console.log(`SPLIT API listening on : ${PORT}`);
  });
};

startServer();
