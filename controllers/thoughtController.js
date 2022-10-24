const { ObjectId } = require("mongoose").Types;
const res = require("express/lib/response");
const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get one thought
  getSingleThought(req, res) {
    Thought.findById(ObjectId(req.params.thoughtId))
      .then((thought) =>
        !thought
          ? res.status(404).json({ messsage: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a thought
  addThought(req, res) {
    Thought.create(req.body)
      .then(async function (thought) {
        // Update user's thought array
        await User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: ObjectId(thought._id) } },
          { runValidators: true, new: true }
        );

        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findByIdAndUpdate(
      ObjectId(req.params.thoughtId),
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this Id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndRemove(
        ObjectId(req.params.thoughtId)
      );

      res.status(404).json({ message: "Thought was deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a reaction
  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      ObjectId(req.params.thoughtId),
      {
        $addToSet: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
          },
        },
      },
      { runValidators: true, new: true, returnDocument: "after" }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this Id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findById(ObjectId(req.params.thoughtId));

      const result = thought.reactions.find(
        (reaction) => reaction.reactionId == req.params.reactionId
      );

      thought.reactions.remove(result);

      thought.save();

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
