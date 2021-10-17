class UserController {
  static allAboard (_, res) {
    res.status(200).send("All");
  }
  static userAccess (_, res) {
    res.status(200).send("User");
  }
  static adminAccess (_, res) {
    res.status(200).send("Admin");
  }
  static modAccess (_, res) {
    res.status(200).send("Moderator");
  }
}
module.exports = { UserAccess: UserController };
