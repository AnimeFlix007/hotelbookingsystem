const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  countByCity,
  countByType
} = require("../controllers/hotelController");
const { verifyToken, verifyAdmin } = require("../utils/verify-token");
const router = express.Router();

router.post("/", verifyToken, verifyAdmin, createHotel);

router.put("/:id", verifyToken, verifyAdmin, updateHotel);

router.delete("/:id", verifyToken, verifyAdmin, deleteHotel);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/:id", getHotel);

router.get("/", getAllHotels);


module.exports = router;
