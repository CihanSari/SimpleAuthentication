const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initDB } = require("./db");
const { getRoutes } = require("./server/routes");
const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
initDB();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// routes
app.use(getRoutes());

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
