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

// /api/user
router.route("/").get(getUsers);
router.route("/").post(addUser);

// /api/user/:userId
router.route("/:userId").get(getSingleUser);
router.route("/:userId").put(updateUser);
router.route("/:userId").delete(deleteUser);

// /api/user/:userId/friends/:friendsId
router.route("/:userId/friends/:friendId").post(addFriend);
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
