const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error");
const jwt = require("jsonwebtoken");

//Register
exports.register = async (req, res, next) => {
  const {  password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = new User({
      // username,
      // email,
      ...req.body,
      password: hash,
    });

    await user.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

//Login
exports.login = async (req, res, next) => {
  // const { email, password } = req.body

  try {
    // const user = await User.findOne({ email });
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(400, "User not found!"));
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatch) {
      return next(createError(400, "Invalid email or password"));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options)
    .json({
        success: true,
        user,
        token
    })
  } catch (err) {
    next(err);
  }
};
