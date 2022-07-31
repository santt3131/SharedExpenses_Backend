
const User = require("../user/user.model");
const userServices = require("../user/user.service");
const Auth = require("../user/user.service");
const { needsAuthToken } = require("../user/auth/auth.middleware");


const login = async (req, res) => {
  const loginData = req.body;
  const token = await userServices.authenticateUser(loginData);
  res.status(200).json(token);
};

module.exports = {
login,
};