const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");


// exports.isAuthenticated = async (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return next(createError(401, "You are not authenticated!"));
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid!"));
//     req.user = user;
//     next();
//   });
// };

exports.verifyToken =async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

exports.verifyAdmin = (req, res, next) => {
  if (req?.user?.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};


