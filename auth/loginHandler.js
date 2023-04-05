const bcrypt = require("bcrypt");

const { getUserByEmail } = require("../controllers/userController");
const issueToken = require("./issueToken");

const loginHandler = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid login data");
  }

  if (!user.verify) {
    throw new Error("Email not verified");
  }

  const result = await bcrypt.compare(password, user.password);
  if (result) {
    return issueToken(user);
  } else {
    throw new Error("Invalid login data");
  }
};

module.exports = loginHandler;
