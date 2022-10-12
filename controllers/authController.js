const bcrypt = require("bcryptjs");
const User = require("../models/User");
const HttpError = require("../utils/http-error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const userName = await User.findOne({ username: req.body.username });
    if (userName) {
      return next(HttpError(404, "User already created (username)"));
    }
    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
      return next(HttpError(404, "User already created(email)"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    return next(HttpError());
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(HttpError(404, "User not created"));
    }

    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPassCorrect) {
      return next(HttpError(400, "Incorrect Password"));
    }

    const { password, isAdmin, ...others } = user._doc;

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    res.status(200).json({ details: { ...others }, isAdmin, token });
  } catch (error) {
    return next(HttpError());
  }
};

module.exports = {
  register,
  login,
};
