const bcrypt = require("bcrypt");

const { getUserByEmail } = require("../controllers/userController");
const issueToken = require("./issueToken");

const loginHandler = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const result = bcrypt.compareSync(password, user.password);
  if (result) {
    return issueToken(user);
  } else {
    throw new Error("Invalid password");
  }
};

module.exports = loginHandler;