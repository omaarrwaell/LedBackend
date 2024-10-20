const asyncHandler = require("express-async-handler");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegistration = asyncHandler(async (req, res) => {
  const saltRounds = await bcrypt.genSalt(10);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const userToRegister = await User.create({
      name: req.body.name,
      email: req.body.email,
      userName: req.body.userName,
      passwrod: hashedPassword,
      gender: req.body.gender,
      mobileNumber: req.body.mobileNumber,
    });
    res.status(200).json(userToRegister);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });
  console.log(email);
  console.log(req.body);
  if (user && (await bcrypt.compare(password, user.passwrod))) {
    return res.json({
      token: generateToken(user._id, user.email),
    });
  }

  return res.status(500).json({ error: "Invalid email or password" });
});

const generateToken = (id, role, email) => {
  return jwt.sign({ id, role, email }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "2h",
  });
};

module.exports = { userRegistration, userLogin };
