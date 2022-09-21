const {
  createHotel,
  updateHotel,
  getHotel,
  deleteHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controller/hotel");
const {verifyAdmin,verifyToken } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/").post(verifyToken, verifyAdmin,createHotel);

router.route("/:id").put(verifyToken, verifyAdmin,updateHotel);

router.route("/:id").delete(verifyToken,verifyAdmin, deleteHotel);

router.route("/find/:id").get(getHotel);

router.route("/").get(getHotels);

router.route("/countByCity").get(countByCity);

router.route("/countByType").get(countByType);

router.route("/room/:id").get(getHotelRooms);


module.exports = router;
