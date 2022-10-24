const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers);
router.route("/").post(addUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);
router.route("/:userId").put(updateUser);
router.route("/:userId").delete(deleteUser);

// /api/users/:userId/friends/:friendsId
router.route("/:userId/friends/:friendId").post(addFriend);
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
