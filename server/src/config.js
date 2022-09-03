require('dotenv').config();

const checkEnvVar = (name) => {
  if (process.env[name] === undefined) {
    throw new Error(`Undefined env. variable ${name}!!!`);
  }
  return process.env[name];
};
module.exports = {
  PORT: checkEnvVar("PORT"),  
  MONGO_URL: checkEnvVar("MONGO_URL"),
  JWT_SECRET: checkEnvVar("JWT_SECRET"),
  JWT_EXPIRATION: checkEnvVar("JWT_EXPIRATION"),
  FRONTEND_DIR: checkEnvVar("FRONTEND_DIR"),
  EMAIL_USER: checkEnvVar("EMAIL_USER"),
  EMAIL_PASSWORD: checkEnvVar("EMAIL_PASSWORD"),
};
