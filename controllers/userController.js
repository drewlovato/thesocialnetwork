// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all user
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne(ObjectId(req.params.userId))
      .populate("thoughts")
      .populate("friends")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new user
  addUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update user
  updateUser(req, res) {
    User.findByIdAndUpdate(
      ObjectId(req.params.userId),
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404)({ message: "No user found with this ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and remove them from the thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: ObjectId(req.params.userId),
      });

      if (user) {
        const thoughts = await Thought.deleteMany({ username: user.username });

        // Delete all friends in user's friends array
        const friends = await User.updateMany(
          {},
          {
            $pull: { friends: req.params.userId },
          }
        );
      } else {
        res.status(404).json({ message: "No such user exists" });
      }
      res.json({ message: "User was deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend to a user
  addFriend(req, res) {
    console.log("You are adding a new friend");
    console.log(req.body);
    User.findOneAndUpdate(
      ObjectId(req.params.userId),
      { $addToSet: { friends: ObjectId(req.params.firendId) } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove friend from user
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      ObjectId(req.params.studentId),
      {
        $pull: { friends: { ObjectId: req.params.friendId } },
      },
      { renderDocument: "after" }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
