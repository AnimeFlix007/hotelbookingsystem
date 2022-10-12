const User = require("../models/User");
const HttpError = require("../utils/http-error");

const updateUser = async (req, res, next) => {
  try {
    const savedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(savedUser);
  } catch (error) {
    return next(HttpError());
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted Successfully");
  } catch (error) {
    return next(HttpError());
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    return next(HttpError());
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    return next(HttpError());
  }
};

module.exports = {
  deleteUser,
  updateUser,
  getAllUsers,
  getUser,
};
