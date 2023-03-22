const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const { validateCreateUser } = require("../../models/user");
const loginHandler = require("../../auth/loginHandler");

router.post("/signup", async (req, res, next) => {
  try {
    const { error } = validateCreateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const newUser = await userController.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email or password is missing" });
  }

  try {
    const isValidPassword = await loginHandler(email, password);
    if (isValidPassword) {
      return res.status(200).json({ message: "Login success" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
    return res.status(404).json({ message: "Invalid login data" });
  }
});

module.exports = router;
