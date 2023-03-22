const bcrypt = require("bcrypt");

const { getUserByEmail } = require("../controllers/userController");

const loginHandler = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  return bcrypt.compareSync(password, user.password);
  //   if (!isValidPassword) {
  //     throw new Error("Invalid password");
  //   }
  // return isValidPassword;
};

module.exports = loginHandler;
