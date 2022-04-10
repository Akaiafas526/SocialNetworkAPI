const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        email: req.body.email,
      },
      { new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.status(200).json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Add an friend to a user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends : req.params.friendId } },
      {new: true}
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user found with that ID" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove assignment from a student
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      {new: true}
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user found with that ID" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
