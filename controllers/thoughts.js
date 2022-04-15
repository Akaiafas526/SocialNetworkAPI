const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
   getThoughts(req, res) {
     Thought.find()
      .then((thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
   getSingleThought(req, res) {
     Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Updates thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        thoughtText: req.body.thoughtText,
      },
      { new: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.status(200).json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Add a thought reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought reaction found with that ID" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Removes reaction from thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {_id: req.params.reactionId}} },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No reaction found with that ID" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
