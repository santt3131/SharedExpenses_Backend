const User = require("../user/user.model");
const userServices = require("../user/user.service");
const Auth = require("../user/user.service");
const { needsAuthToken } = require("../user/auth/auth.middleware");


const login = async (req, res) => {
  const loginData = req.body;
  try {
    const loginValidation = await userServices.authenticateUser(loginData);
    res.status(200).json(loginValidation);
    res.status(200).json(needsAuthToken.token);

  } catch (e) {
    
    console.log(e);
  }

};
  const logOut = async (req, res) => {
  const [token, setToken] = useState(tk.readToken);
  const SignOut = req.body;
  try {
    const SignOut = await userServices.authenticateUser(loginData);
    res.status(200).json(SignOut);
  } catch (e) {
    
    console.log(e);
  }

};


module.exports = {
login
};