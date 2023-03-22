const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const { validateCreateUser } = require("../../models/user");

router.post("/", async (req, res, next) => {
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

module.exports = router;
