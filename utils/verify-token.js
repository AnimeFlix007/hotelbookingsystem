const jwt = require("jsonwebtoken");
const HttpError = require("./http-error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(HttpError(401, "User unauthenticated"));
    // return res.status(401).json({
    //   message: "User unauthenticated"
    // })
  }
  jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(HttpError(401, "token not valid"));
    }
    req.user = user;
    return next();
  });
};

const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(HttpError(401, "You are not authorized!"));
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return next(
      HttpError(401, "You are not authorized! only admins can visit")
    );
  }
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
