const { verifyAdmin, verifyToken } = require("../middlewares/auth");

const router = require("express").Router();
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
} = require("../controller/room");

router.route("/:hotelid").post(verifyToken, verifyAdmin, createRoom);

router.route("/:id").put(verifyToken, verifyAdmin, updateRoom);

router.route("/availability/:id").put(updateRoomAvailability);

router.route("/:id/:hotelid").delete(verifyToken, verifyAdmin, deleteRoom);

router.route("/:id").get(getRoom);

router.route("/").get(getRooms);

module.exports = router;
