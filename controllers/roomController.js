const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const HttpError = require("../utils/http-error");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const newRoom = new Room(req.body);
    try {
      await Hotel.findById(hotelId);
    } catch (error) {
      return next(HttpError(400, "Invalid Hotel Id"));
    }

    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      return next(HttpError());
    }

    res.status(200).json(savedRoom);
  } catch (error) {
    return next(HttpError());
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const savedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(savedRoom);
  } catch (error) {
    return next(HttpError());
  }
};

const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {

    try {
      await Hotel.findById(hotelId);
    } catch (error) {
      return next(HttpError(400, "Invalid Hotel Id"));
    }

    try {
      let room = await Room.findById(req.params.id)
      if(!room){
          return next(HttpError(400, "Invalid room Id"));
      }
    } catch (error) {
      return next(HttpError(400, "Invalid room Id"));
    }

   await Room.findByIdAndDelete(req.params.id);

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      return next(HttpError());
    }

    res.status(200).json("Deleted Successfully");

  } catch (error) {
    return next(HttpError());
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if(!room) {
        return next(HttpError(404, "Invalid room Id"));
    }
    res.status(200).json(room);
  } catch (error) {
    return next(HttpError());
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    return next(HttpError());
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms
};