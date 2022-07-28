
const User = require("../user/user.model");
const userServices = require("../user/user.service");
const Auth = require("../user/user.service");
const { needsAuthToken } = require("../user/auth/auth.middleware");


const login = async (req, res) => {
  const loginData = req.body;
  const token = await userServices.authenticateUser(loginData);
  res.status(200).json(token);
};
/*
const login = async (req, res) => {
  try {
    const docs = await User.find().populate("groups").lean().exec();
    res.status(200).json({ results: docs });
  } catch (error) {
    console.log(e);
    res.status(500).json({ error: "Internal error" });
  }
};
*/
module.exports = {
login,
};