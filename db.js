const { mongoose, roleModel } = require("./server/models");
const { HOST, PORT, DB } = require("./server/config/db.config.js");

function initial() {
  roleModel.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

function initDB() {
  mongoose
    .connect(`mongodb://${HOST}:${PORT}/${DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
      initial();
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });
}

module.exports = { initDB };
