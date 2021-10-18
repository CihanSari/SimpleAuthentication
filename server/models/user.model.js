const mongoose = require("mongoose");

const userModel = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    passwordHash: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = { userModel };
