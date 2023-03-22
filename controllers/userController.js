const { User, hashPassword } = require("../models/user");

const createUser = async (body) => {
  try {
    const { email, password } = body;
    const passwordHash = hashPassword(password);
    const newUser = await User.create({ email, password: passwordHash });
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};
