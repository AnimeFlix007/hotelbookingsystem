const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms } = require("../controllers/roomController")

const express = require('express');
const { verifyToken, verifyAdmin } = require("../utils/verify-token");
const router = express.Router()

router.post('/:hotelId', verifyToken, verifyAdmin, createRoom)

router.put("/:id", verifyToken, verifyAdmin, updateRoom);

router.delete("/:id/:hotelId", verifyToken, verifyAdmin, deleteRoom);

router.get("/:id", getRoom);

router.get("/", getAllRooms);

module.exports = router