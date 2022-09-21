const express = require("express");
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controller/user");
const router = express.Router();
const {
  verifyAdmin, 
  verifyToken,
 
} = require("../middlewares/auth");


router.route("/").get(verifyToken, verifyAdmin, getUsers);
router
  .route("/:id")
  .get(verifyToken, getUser)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

module.exports = router;
