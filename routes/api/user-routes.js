const router = require("express").Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require("../../controllers/user-controller");

// get all and post for users
router.route("/").get(getAllUsers).post(createUser);

// get one, put, and delete for user by id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// adding and deleting a friend
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;