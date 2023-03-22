const { User } = require("../models/user");

const createUser = async (body) => {
  const user = new User(body);
  await user.save();
  return user;
};

module.exports = {
  createUser,
};
