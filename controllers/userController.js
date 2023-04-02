const { User, hashPassword } = require("../models/user");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const createUser = async (body) => {
  const { email, password } = body;
  const avatarURL = gravatar.url(email, { s: "250", d: "monsterid" });
  const passwordHash = hashPassword(password);
  const newUser = await User.create({
    email,
    password: passwordHash,
    avatarURL,
    verify: false,
    verifyToken: uuidv4(),
  });
  return newUser;
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const updateSubscription = async (email, body) => {
  const { subscription } = body;
  const user = await User.findOneAndUpdate(
    { email },
    { subscription },
    { new: true }
  );
  return user;
};

const updateAvatar = async (email, avatarURL) => {
  const user = await User.findOneAndUpdate(
    { email },
    { avatarURL },
    { new: true }
  );
  return user;
};

const verifyUser = async (verifyToken) => {
  return await User.findOneAndUpdate(
    { verifyToken },
    { verify: true, verifyToken: null },
    { new: true }
  );
};

const logout = async (token) => {
  const user = await User.findOneAndUpdate(
    { token },
    { token: null },
    { new: true }
  );
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
  updateSubscription,
  updateAvatar,
  verifyUser,
  logout,
};
