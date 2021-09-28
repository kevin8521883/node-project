const jwt = require("jsonwebtoken");

module.exports = function verifyToken(token) {
  let tokenResult = "";
  const time = Math.floor(Date.now() / 1000);
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, "my_token", function (err, decoded) {
        if (err) {
          tokenResult = false;
          resolve(tokenResult);
        } else if (decoded.exp <= time) {
          tokenResult = false;
          resolve(tokenResult);
        } else {
          tokenResult = decoded.data;
          resolve(tokenResult);
        }
      });
    }
  });
};
