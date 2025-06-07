const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are manadatory");
  }

  const userExists = await User.findOne({ username, email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    data: user,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are manadatory");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // only in prod
    sameSite: "lax", // CSRF protection
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
  });
});

const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = logoutUser;


const currentUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await User.findOne({ _id: id });
  res.status(200).json({ success: true, data: user });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  logoutUser
};
