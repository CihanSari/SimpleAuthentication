module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  PORT: process.env.DB_PORT || 26257,
  DB: process.env.DB_NAME || "auth",
  USER: process.env.USER_NAME || "authUser",
  PASS: process.env.USER_PASS || "",
};
