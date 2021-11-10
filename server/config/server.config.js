const PORT = process.env.PORT || 4000;
const URL = process.env.URL || `http://localhost:${PORT}`;
const LOG_PATH = process.env.LOG_PATH || "volumes/server/log/";
module.exports = { PORT, URL, LOG_PATH };
