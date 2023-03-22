const { User, hashPassword } = require("../models/user");

const createUser = async (body) => {
  const { email, password } = body;
  const passwordHash = hashPassword(password);
  const newUser = await User.create({ email, password: passwordHash });
  return newUser;
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  createUser,
  getUserByEmail,
};
