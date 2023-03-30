const { User, hashPassword } = require("../models/user");
const gravatar = require("gravatar");

const createUser = async (body) => {
  const { email, password } = body;
  const avatarURL = gravatar.url(email, { s: "250", d: "monsterid" });
  const passwordHash = hashPassword(password);
  const newUser = await User.create({ email, password: passwordHash, avatarURL });
  return newUser;
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const updateSubscription = async (email, body) => {
  const { subscription } = body;
  const user = await User.findOneAndUpdate({ email }, { subscription }, { new: true });
  return user;
};

const updateAvatar = async (email, body) => {
  const { avatarURL } = body;
  const user = await User.findOneAndUpdate({ email }, { avatarURL }, { new: true });
  return user;
};

const logout = async (token) => {
  const user = await User.findOneAndUpdate({ token }, { token: null }, { new: true });
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
  updateSubscription,
  updateAvatar,
  logout,
};
