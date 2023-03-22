const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const issueToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "1h" });
  return token;
};

module.exports = issueToken;
