class UserController {
  static guestUser(_, res) {
    res.status(200).send("Guest");
  }
  static userAccess(_, res) {
    res.status(200).send("User");
  }
  static modAccess(_, res) {
    res.status(200).send("Moderator");
  }
  static adminAccess(_, res) {
    res.status(200).send("Administrator");
  }
}
module.exports = { UserAccess: UserController };
